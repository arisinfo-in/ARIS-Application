import React, { useState, useEffect, memo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Users, 
  FileText, 
  ExternalLink,
  Plus,
  LogIn,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Award,
  Link as LinkIcon,
  Video,
  File
} from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import {
  authenticateWithGoogle,
  isAuthenticated,
  signOutFromGoogle,
  listCourses,
  getCourse,
  listCoursework,
  getStudentSubmissions,
  joinCourse,
  loadGoogleAPI,
  initGoogleAPI,
  ClassroomCourse,
  ClassroomCoursework,
  StudentSubmission
} from '../services/googleClassroomService';
import { format } from 'date-fns';

const Classroom: React.FC = () => {
  const { user } = useAuth();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ClassroomCourse | null>(null);
  const [coursework, setCoursework] = useState<ClassroomCoursework[]>([]);
  const [submissions, setSubmissions] = useState<Map<string, StudentSubmission[]>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [courseworkLoading, setCourseworkLoading] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        await loadGoogleAPI();
        const isAuth = await isAuthenticated(user.uid);
        setAuthenticated(isAuth);
        
        if (isAuth) {
          await loadCourses();
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setError('Failed to check authentication status.');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user]);

  // Load courses
  const loadCourses = async () => {
    if (!user) return;
    
    try {
      setError(null);
      const coursesList = await listCourses(user.uid);
      setCourses(coursesList);
    } catch (error: any) {
      console.error('Error loading courses:', error);
      setError(error.message || 'Failed to load courses.');
    }
  };

  // Handle Google authentication
  const handleAuthenticate = async () => {
    if (!user) return;
    
    setAuthLoading(true);
    setError(null);
    try {
      await authenticateWithGoogle(user.uid);
      setAuthenticated(true);
      setSuccessMessage('Successfully connected to Google Classroom!');
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadCourses();
    } catch (error: any) {
      console.error('Error authenticating:', error);
      const errorMessage = error?.message || error?.error || 'Failed to authenticate with Google Classroom.';
      
      // Provide more helpful error messages
      if (errorMessage.includes('server error') || errorMessage.includes('server_error')) {
        setError('OAuth Configuration Issue: Please check Google Cloud Console - OAuth consent screen must be configured, your email must be added as a test user (if app is in Testing mode), and all Classroom scopes must be approved.');
      } else if (errorMessage.includes('redirect_uri_mismatch') || errorMessage.includes('Redirect URI')) {
        setError(`${errorMessage} Make sure 'http://localhost:5173' is added to Authorized JavaScript origins and Authorized redirect URIs in Google Cloud Console.`);
      } else if (errorMessage.includes('403') || errorMessage.includes('forbidden')) {
        setError('Access Forbidden: Please verify OAuth consent screen settings and ensure your email is added as a test user in Google Cloud Console.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    if (!user) return;
    
    setAuthLoading(true);
    setError(null);
    try {
      await signOutFromGoogle(user.uid);
      setAuthenticated(false);
      setCourses([]);
      setSelectedCourse(null);
      setCoursework([]);
      setSubmissions(new Map());
      setSuccessMessage('Disconnected from Google Classroom.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError(error.message || 'Failed to sign out.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Load coursework for selected course
  const loadCoursework = async (course: ClassroomCourse) => {
    if (!user) return;
    
    setCourseworkLoading(true);
    setError(null);
    try {
      const work = await listCoursework(user.uid, course.id);
      setCoursework(work);
      setSelectedCourse(course);
      
      // Load submissions for each coursework
      const submissionsMap = new Map<string, StudentSubmission[]>();
      for (const cw of work) {
        try {
          const subs = await getStudentSubmissions(user.uid, course.id, cw.id);
          submissionsMap.set(cw.id, subs);
        } catch (err) {
          console.error(`Error loading submissions for ${cw.id}:`, err);
        }
      }
      setSubmissions(submissionsMap);
    } catch (error: any) {
      console.error('Error loading coursework:', error);
      setError(error.message || 'Failed to load assignments.');
    } finally {
      setCourseworkLoading(false);
    }
  };

  // Handle join course
  const handleJoinCourse = async () => {
    if (!user || !enrollmentCode.trim()) return;
    
    setJoinLoading(true);
    setError(null);
    try {
      const course = await joinCourse(user.uid, enrollmentCode.trim());
      setSuccessMessage(`Successfully joined ${course.name}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setShowJoinModal(false);
      setEnrollmentCode('');
      await loadCourses();
    } catch (error: any) {
      console.error('Error joining course:', error);
      setError(error.message || 'Failed to join course. Please check the enrollment code.');
    } finally {
      setJoinLoading(false);
    }
  };

  // Format due date
  const formatDueDate = (coursework: ClassroomCoursework): string => {
    if (!coursework.dueDate) return 'No due date';
    
    const { year, month, day } = coursework.dueDate;
    const date = new Date(year, month - 1, day);
    
    if (coursework.dueTime) {
      date.setHours(coursework.dueTime.hours, coursework.dueTime.minutes);
      return format(date, 'MMM d, yyyy h:mm a');
    }
    
    return format(date, 'MMM d, yyyy');
  };

  // Get submission status
  const getSubmissionStatus = (courseworkId: string): { status: string; color: string; icon: React.ReactNode } => {
    const submissionList = submissions.get(courseworkId);
    if (!submissionList || submissionList.length === 0) {
      return {
        status: 'Not submitted',
        color: 'text-gray-400',
        icon: <Clock className="w-4 h-4" />
      };
    }
    
    const submission = submissionList[0];
    if (submission.state === 'TURNED_IN') {
      return {
        status: 'Turned in',
        color: 'text-green-400',
        icon: <CheckCircle2 className="w-4 h-4" />
      };
    } else if (submission.state === 'RETURNED') {
      return {
        status: 'Returned',
        color: 'text-blue-400',
        icon: <Award className="w-4 h-4" />
      };
    } else if (submission.state === 'NEW' || submission.state === 'CREATED') {
      return {
        status: 'Draft',
        color: 'text-yellow-400',
        icon: <FileText className="w-4 h-4" />
      };
    }
    
    return {
      status: submission.state,
      color: 'text-gray-400',
      icon: <Clock className="w-4 h-4" />
    };
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-300">Loading Classroom...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-aris-gradient min-h-screen">
      {/* Error Message */}
      {error && (
        <NeumorphicCard padding="md" className="mb-6 bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        </NeumorphicCard>
      )}

      {/* Success Message */}
      {successMessage && (
        <NeumorphicCard padding="md" className="mb-6 bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-400 text-sm">{successMessage}</p>
          </div>
        </NeumorphicCard>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-high-contrast mb-2 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-orange-500" />
              Google Classroom
            </h1>
            <p className="text-secondary-contrast">Access your classes, assignments, and course materials</p>
          </div>
          <div className="flex gap-3">
            {authenticated ? (
              <>
                <NeumorphicButton
                  variant="accent"
                  onClick={() => setShowJoinModal(true)}
                  icon={Plus}
                >
                  Join Class
                </NeumorphicButton>
                <NeumorphicButton
                  variant="secondary"
                  onClick={handleSignOut}
                  icon={LogOut}
                  disabled={authLoading}
                >
                  {authLoading ? 'Disconnecting...' : 'Disconnect'}
                </NeumorphicButton>
              </>
            ) : (
              <NeumorphicButton
                variant="accent"
                onClick={handleAuthenticate}
                icon={LogIn}
                disabled={authLoading}
              >
                {authLoading ? 'Connecting...' : 'Connect to Google Classroom'}
              </NeumorphicButton>
            )}
          </div>
        </div>
      </div>

      {/* Not Authenticated State */}
      {!authenticated && (
        <NeumorphicCard padding="xl" className="text-center">
          <GraduationCap className="w-24 h-24 text-orange-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Connect to Google Classroom</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Connect your Google Classroom account to view your courses, assignments, and materials all in one place.
          </p>
          <NeumorphicButton
            variant="accent"
            size="lg"
            onClick={handleAuthenticate}
            icon={LogIn}
            disabled={authLoading}
          >
            {authLoading ? 'Connecting...' : 'Connect with Google'}
          </NeumorphicButton>
        </NeumorphicCard>
      )}

      {/* Authenticated - Courses List */}
      {authenticated && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses Sidebar */}
          <div className="lg:col-span-1">
            <NeumorphicCard padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-100">My Classes</h2>
                <span className="text-sm text-gray-400">{courses.length}</span>
              </div>
              
              {courses.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">No classes found</p>
                  <NeumorphicButton
                    variant="accent"
                    size="sm"
                    onClick={() => setShowJoinModal(true)}
                    icon={Plus}
                  >
                    Join a Class
                  </NeumorphicButton>
                </div>
              ) : (
                <div className="space-y-2">
                  {courses.map((course) => (
                    <NeumorphicCard
                      key={course.id}
                      variant={selectedCourse?.id === course.id ? 'pressed' : undefined}
                      padding="md"
                      className={`cursor-pointer transition-all ${
                        selectedCourse?.id === course.id
                          ? 'ring-2 ring-orange-500 bg-orange-500/10'
                          : 'hover:bg-gray-800/50'
                      }`}
                      onClick={() => loadCoursework(course)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-gray-100" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-100 truncate">{course.name}</h3>
                          {course.section && (
                            <p className="text-sm text-gray-400 truncate">{course.section}</p>
                          )}
                          {course.teacherGroupEmail && (
                            <p className="text-xs text-gray-500 truncate mt-1">
                              {course.teacherGroupEmail}
                            </p>
                          )}
                        </div>
                      </div>
                    </NeumorphicCard>
                  ))}
                </div>
              )}
            </NeumorphicCard>
          </div>

          {/* Course Details & Coursework */}
          <div className="lg:col-span-2">
            {!selectedCourse ? (
              <NeumorphicCard padding="xl" className="text-center">
                <BookOpen className="w-24 h-24 text-orange-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-100 mb-4">Select a Class</h2>
                <p className="text-gray-300">
                  Choose a class from the sidebar to view assignments and course materials.
                </p>
              </NeumorphicCard>
            ) : (
              <div className="space-y-6">
                {/* Course Header */}
                <NeumorphicCard padding="lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-100 mb-2">{selectedCourse.name}</h2>
                      {selectedCourse.section && (
                        <p className="text-gray-300 mb-2">{selectedCourse.section}</p>
                      )}
                      {selectedCourse.description && (
                        <p className="text-gray-400 text-sm mb-4">{selectedCourse.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        {selectedCourse.room && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{selectedCourse.room}</span>
                          </div>
                        )}
                        {selectedCourse.alternateLink && (
                          <a
                            href={selectedCourse.alternateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Open in Classroom</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </NeumorphicCard>

                {/* Coursework/Assignments */}
                <NeumorphicCard padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-100">Assignments</h3>
                    {courseworkLoading && (
                      <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                    )}
                  </div>

                  {coursework.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                      <p className="text-gray-300">No assignments found for this class.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {coursework.map((cw) => {
                        const submissionStatus = getSubmissionStatus(cw.id);
                        return (
                          <NeumorphicCard key={cw.id} variant="pressed" padding="md">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-gray-100">{cw.title}</h4>
                                  <div className={`flex items-center gap-1 ${submissionStatus.color}`}>
                                    {submissionStatus.icon}
                                    <span className="text-xs">{submissionStatus.status}</span>
                                  </div>
                                </div>
                                {cw.description && (
                                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                                    {cw.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                  {cw.dueDate && (
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>Due: {formatDueDate(cw)}</span>
                                    </div>
                                  )}
                                  {cw.maxPoints && (
                                    <div className="flex items-center gap-1">
                                      <Award className="w-3 h-3" />
                                      <span>{cw.maxPoints} points</span>
                                    </div>
                                  )}
                                </div>
                                {cw.materials && cw.materials.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {cw.materials.map((material, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
                                      >
                                        {material.driveFile && <File className="w-3 h-3" />}
                                        {material.youTubeVideo && <Video className="w-3 h-3" />}
                                        {material.link && <LinkIcon className="w-3 h-3" />}
                                        <span className="truncate max-w-[150px]">
                                          {material.driveFile?.driveFile.title ||
                                            material.youTubeVideo?.title ||
                                            material.link?.title ||
                                            'Material'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {cw.alternateLink && (
                                <a
                                  href={cw.alternateLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-4 flex-shrink-0"
                                >
                                  <NeumorphicButton variant="ghost" size="sm" icon={ExternalLink}>
                                    Open
                                  </NeumorphicButton>
                                </a>
                              )}
                            </div>
                          </NeumorphicCard>
                        );
                      })}
                    </div>
                  )}
                </NeumorphicCard>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Join Class Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <NeumorphicCard padding="lg" className="max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Join a Class</h3>
            <p className="text-gray-300 text-sm mb-4">
              Enter the class code provided by your teacher to join the class.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Class Code
              </label>
              <input
                type="text"
                value={enrollmentCode}
                onChange={(e) => setEnrollmentCode(e.target.value.toUpperCase())}
                placeholder="Enter class code"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                maxLength={10}
              />
            </div>
            <div className="flex gap-3">
              <NeumorphicButton
                variant="accent"
                onClick={handleJoinCourse}
                disabled={!enrollmentCode.trim() || joinLoading}
                className="flex-1"
              >
                {joinLoading ? 'Joining...' : 'Join Class'}
              </NeumorphicButton>
              <NeumorphicButton
                variant="secondary"
                onClick={() => {
                  setShowJoinModal(false);
                  setEnrollmentCode('');
                }}
                disabled={joinLoading}
              >
                Cancel
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      )}
    </div>
  );
};

export default memo(Classroom);

