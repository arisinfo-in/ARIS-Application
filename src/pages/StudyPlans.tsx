import React, { useState, useEffect, useCallback, memo } from 'react';
import { Plus, Calendar, Target, CheckCircle, Circle, Trash2 } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { firestoreOperations, StudyPlan } from '../firebase/firestore';
import { format, addDays } from 'date-fns';

const StudyPlans: React.FC = () => {
  const { user } = useAuth();
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [planDuration, setPlanDuration] = useState<number>(7);
  const [planType, setPlanType] = useState<string>('beginner');
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);

  const loadStudyPlans = useCallback(async () => {
    if (!user) return;
    
    setLoading(false); // Set loading to false immediately
    try {
      const plans = await firestoreOperations.getUserStudyPlans(user.uid);
      setStudyPlans(plans);
    } catch (error) {
      console.error('Error loading study plans:', error);
    }
  }, [user]);

  useEffect(() => {
    loadStudyPlans();
  }, [loadStudyPlans]);


  const createRecommendedPlan = async () => {
    if (!user) return;

    setIsGeneratingRecommendation(true);
    try {
      // Get user's test attempts to analyze performance
      const testAttempts = await firestoreOperations.getUserTestAttempts(user.uid);
      
      // Analyze performance and create recommendations
      const recommendations = analyzePerformanceAndRecommend(testAttempts);
      
      const recommendedPlan: Omit<StudyPlan, 'id'> = {
        userId: user.uid,
        title: recommendations.title,
        schedule: recommendations.schedule,
        progressPercent: 0,
        createdAt: new Date().toISOString()
      };

      await firestoreOperations.createStudyPlan(recommendedPlan);
      loadStudyPlans();
    } catch (error) {
      console.error('Error creating recommended plan:', error);
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };

  const analyzePerformanceAndRecommend = (testAttempts: Array<{ module: string; score: number }>) => {
    // Analyze test performance by module
    const modulePerformance: { [key: string]: { scores: number[], count: number } } = {};
    
    testAttempts.forEach(attempt => {
      const module = attempt.testId?.split('-')[0] || 'general';
      if (!modulePerformance[module]) {
        modulePerformance[module] = { scores: [], count: 0 };
      }
      modulePerformance[module].scores.push(attempt.score);
      modulePerformance[module].count++;
    });

    // Calculate average scores and identify weak areas
    const moduleAverages: { [key: string]: number } = {};
    Object.keys(modulePerformance).forEach(module => {
      const scores = modulePerformance[module].scores;
      moduleAverages[module] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    // Determine skill level based on overall performance
    const overallAverage = Object.values(moduleAverages).length > 0 
      ? Object.values(moduleAverages).reduce((sum, avg) => sum + avg, 0) / Object.values(moduleAverages).length
      : 0;

    let skillLevel = 'beginner';
    if (overallAverage >= 80) skillLevel = 'advanced';
    else if (overallAverage >= 60) skillLevel = 'intermediate';

    // Identify weak areas (modules with scores below 70%)
    const weakAreas = Object.entries(moduleAverages)
      .filter(([, avg]) => avg < 70)
      .map(([module]) => module);

    // Create recommendations based on analysis
    let recommendedModules: string[] = [];
    let planTitle = '';
    let duration = 14;

    if (skillLevel === 'beginner') {
      recommendedModules = ['excel', 'statistics', 'sql'];
      planTitle = 'Foundation Building Plan';
      duration = 14;
    } else if (skillLevel === 'intermediate') {
      if (weakAreas.includes('python')) {
        recommendedModules = ['python', 'powerbi', 'statistics'];
        planTitle = 'Python & Analytics Focus';
      } else {
        recommendedModules = ['python', 'powerbi', 'sql', 'statistics'];
        planTitle = 'Intermediate Skills Enhancement';
      }
      duration = 21;
    } else {
      if (weakAreas.includes('ml') || weakAreas.includes('advanced')) {
        recommendedModules = ['ml', 'advanced', 'prompt'];
        planTitle = 'AI & ML Mastery Plan';
      } else {
        recommendedModules = ['ml', 'advanced', 'python', 'prompt'];
        planTitle = 'Advanced Data Science Path';
      }
      duration = 30;
    }

    // If user has weak areas, prioritize those
    if (weakAreas.length > 0 && skillLevel !== 'beginner') {
      const weakModuleMap: { [key: string]: string } = {
        'excel': 'excel',
        'statistics': 'statistics', 
        'sql': 'sql',
        'python': 'python',
        'powerbi': 'powerbi',
        'ml': 'ml',
        'advanced': 'advanced',
        'prompt': 'prompt'
      };
      
      const mappedWeakAreas = weakAreas
        .map(area => weakModuleMap[area])
        .filter(Boolean)
        .slice(0, 3);
      
      if (mappedWeakAreas.length > 0) {
        recommendedModules = [...mappedWeakAreas, ...recommendedModules.filter(m => !mappedWeakAreas.includes(m))].slice(0, 4);
        planTitle = `Weak Areas Focus - ${recommendedModules.map(m => moduleNames[m as keyof typeof moduleNames]).join(', ')}`;
      }
    }

    // Create schedule with recommended modules
    const schedule = recommendedModules.map((module, index) => ({
      module,
      date: format(addDays(new Date(), index * Math.ceil(duration / recommendedModules.length)), 'yyyy-MM-dd'),
      completed: false
    }));

    return {
      title: planTitle,
      schedule,
      duration,
      skillLevel,
      weakAreas
    };
  };

  const toggleScheduleItem = async (planId: string, scheduleIndex: number) => {
    const plan = studyPlans.find(p => p.id === planId);
    if (!plan) return;

    const updatedSchedule = [...plan.schedule];
    updatedSchedule[scheduleIndex].completed = !updatedSchedule[scheduleIndex].completed;

    const completedCount = updatedSchedule.filter(item => item.completed).length;
    const progressPercent = Math.round((completedCount / updatedSchedule.length) * 100);

    try {
      await firestoreOperations.updateStudyPlan(planId, {
        schedule: updatedSchedule,
        progressPercent
      });
      loadStudyPlans();
    } catch (error) {
      console.error('Error updating study plan:', error);
    }
  };

  const deleteStudyPlan = async (planId: string) => {
    if (!window.confirm('Are you sure you want to delete this study plan?')) return;

    try {
      await firestoreOperations.deleteStudyPlan(planId);
      loadStudyPlans();
    } catch (error) {
      console.error('Error deleting study plan:', error);
    }
  };

  const createPlan = async () => {
    if (!user || !newPlanTitle.trim() || selectedModules.length === 0) return;

    // Create schedule based on selected modules and duration
    const schedule = selectedModules.map((module, index) => ({
      module,
      date: format(addDays(new Date(), index * Math.ceil(planDuration / selectedModules.length)), 'yyyy-MM-dd'),
      completed: false
    }));

    const newPlan: Omit<StudyPlan, 'id'> = {
      userId: user.uid,
      title: newPlanTitle.trim(),
      schedule,
      progressPercent: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await firestoreOperations.createStudyPlan(newPlan);
      setNewPlanTitle('');
      setSelectedModules([]);
      setPlanDuration(7);
      setPlanType('beginner');
      setShowCreateForm(false);
      loadStudyPlans();
    } catch (error) {
      console.error('Error creating study plan:', error);
    }
  };

  const moduleNames = {
    excel: 'Microsoft Excel',
    powerbi: 'Power BI',
    sql: 'SQL & Database',
    python: 'Python',
    statistics: 'Statistics',
    ml: 'Machine Learning',
    prompt: 'Prompt Engineering',
    advanced: 'Advanced AI'
  };

  const planTypeTemplates = {
    beginner: {
      name: 'Beginner',
      description: 'Perfect for those new to data analysis',
      modules: ['excel', 'statistics', 'sql'],
      duration: 14
    },
    intermediate: {
      name: 'Intermediate',
      description: 'For those with basic data analysis knowledge',
      modules: ['python', 'powerbi', 'statistics', 'sql'],
      duration: 21
    },
    advanced: {
      name: 'Advanced',
      description: 'For experienced analysts looking to master AI/ML',
      modules: ['python', 'ml', 'advanced', 'prompt'],
      duration: 30
    },
    custom: {
      name: 'Custom',
      description: 'Create your own personalized plan',
      modules: [],
      duration: 7
    }
  };

  const toggleModule = (module: string) => {
    setSelectedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const selectPlanType = (type: string) => {
    setPlanType(type);
    if (type !== 'custom') {
      setSelectedModules(planTypeTemplates[type as keyof typeof planTypeTemplates].modules);
      setPlanDuration(planTypeTemplates[type as keyof typeof planTypeTemplates].duration);
    } else {
      setSelectedModules([]);
      setPlanDuration(7);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Study Plans</h1>
            <p className="text-gray-200">Organize your learning journey with structured plans</p>
          </div>
          <div className="flex gap-3">
            <NeumorphicButton
              variant="secondary"
              onClick={createRecommendedPlan}
              icon={Target}
              disabled={isGeneratingRecommendation}
            >
              {isGeneratingRecommendation ? 'Analyzing...' : 'Get Recommended Plan'}
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              onClick={() => setShowCreateForm(true)}
              icon={Plus}
            >
              Create Plan
            </NeumorphicButton>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <NeumorphicCard padding="lg" className="mb-6">
          <h3 className="text-xl font-bold text-gray-100 mb-6">Create New Study Plan</h3>
          <div className="space-y-6">
            {/* Plan Title */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Plan Title
              </label>
              <input
                type="text"
                value={newPlanTitle}
                onChange={(e) => setNewPlanTitle(e.target.value)}
                placeholder="Enter study plan title..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Plan Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">
                Choose Plan Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(planTypeTemplates).map(([key, template]) => (
                  <NeumorphicCard
                    key={key}
                    padding="md"
                    className={`cursor-pointer transition-all ${
                      planType === key 
                        ? 'ring-2 ring-orange-500 bg-orange-500/10' 
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => selectPlanType(key)}
                  >
                    <div className="text-center">
                      <h4 className="font-medium text-gray-100 mb-1">{template.name}</h4>
                      <p className="text-xs text-gray-300">{template.description}</p>
                      {template.modules.length > 0 && (
                        <p className="text-xs text-orange-400 mt-1">
                          {template.modules.length} modules • {template.duration} days
                        </p>
                      )}
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>

            {/* Module Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">
                Select Modules {planType === 'custom' && '(Choose your own)'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(moduleNames).map(([key, name]) => (
                  <NeumorphicCard
                    key={key}
                    padding="sm"
                    className={`cursor-pointer transition-all ${
                      selectedModules.includes(key)
                        ? 'ring-2 ring-orange-500 bg-orange-500/10'
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => toggleModule(key)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedModules.includes(key) 
                          ? 'bg-orange-500' 
                          : 'bg-gray-600'
                      }`}></div>
                      <span className="text-sm text-gray-100">{name}</span>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Plan Duration: {planDuration} days
              </label>
              <input
                type="range"
                min="3"
                max="60"
                value={planDuration}
                onChange={(e) => setPlanDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${(planDuration - 3) / (60 - 3) * 100}%, #374151 ${(planDuration - 3) / (60 - 3) * 100}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3 days</span>
                <span>60 days</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <NeumorphicButton
                variant="accent"
                onClick={createPlan}
                disabled={!newPlanTitle.trim() || selectedModules.length === 0}
              >
                Create Plan
              </NeumorphicButton>
              <NeumorphicButton
                variant="secondary"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewPlanTitle('');
                  setSelectedModules([]);
                  setPlanDuration(7);
                  setPlanType('beginner');
                }}
              >
                Cancel
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicCard>
      )}

      {/* Study Plans */}
      {studyPlans.length === 0 ? (
        <NeumorphicCard padding="xl" className="text-center">
          <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-100 mb-2">No study plans yet</h3>
          <p className="text-gray-200 mb-6">
            Create your first study plan to organize your learning journey.
          </p>
          <div className="flex gap-3 justify-center">
            <NeumorphicButton
              variant="secondary"
              onClick={createRecommendedPlan}
              icon={Target}
              disabled={isGeneratingRecommendation}
            >
              {isGeneratingRecommendation ? 'Analyzing...' : 'Get Recommended Plan'}
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              onClick={() => setShowCreateForm(true)}
              icon={Plus}
            >
              Create Plan
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {studyPlans.map((plan) => (
            <NeumorphicCard key={plan.id} padding="lg" hoverable>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{plan.title}</h3>
                  <p className="text-gray-200 text-sm">
                    Created {format(new Date(plan.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.progressPercent === 100 
                      ? 'bg-gradient-to-br from-green-400 to-green-500' 
                      : 'bg-gradient-to-br from-orange-400 to-orange-500'
                  }`}>
                    {plan.progressPercent === 100 ? (
                      <CheckCircle className="w-6 h-6 text-gray-100" />
                    ) : (
                      <Target className="w-6 h-6 text-gray-100" />
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-100">Progress</span>
                  <span className="text-sm font-bold text-gray-100">{plan.progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${plan.progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Schedule Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-100 mb-3">Schedule</h4>
                {plan.schedule.map((item, index) => (
                  <NeumorphicCard
                    key={index}
                    variant="pressed"
                    padding="md"
                    className="cursor-pointer"
                    onClick={() => toggleScheduleItem(plan.id, index)}
                  >
                    <div className="flex items-center gap-3">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${item.completed ? 'text-green-400 line-through' : 'text-gray-100'}`}>
                          {moduleNames[item.module as keyof typeof moduleNames] || item.module}
                        </p>
                        <p className="text-sm text-gray-300">
                          {format(new Date(item.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">
                    {plan.schedule.filter(s => s.completed).length} / {plan.schedule.length} completed
                  </span>
                  <NeumorphicButton
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteStudyPlan(plan.id)}
                  >
                    Delete
                  </NeumorphicButton>
                </div>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(StudyPlans);