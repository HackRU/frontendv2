import { BASE } from '../definitions';

const ENDPOINTS = {
    login: BASE + '/authorize',
    /**
     * Default signup url, expects
     */
    signup: BASE + '/create',
    /**
     * Default logout url, expects
     */
    userData: BASE + '/read',
    /**
     * Default user update information, expects
     */
    update: BASE + '/update',
    /**
     * Create forgot magic link to reset password
     */
    forgot: BASE + '/forgot-password',
    /**
     * Reset password from magic link to reset password
     */
    resetpassword: BASE + '/reset-password',
    /**
     * Digest magic links
     */
    waiver: BASE + '/waiver',
    /**
     * Upload resume
     */
    resume: BASE + '/resume',
  
    /**
     * Attend an event
     */
    attend: BASE + '/attend-event',
  
    /**
     * Create a team
     */
    makeTeam: BASE + '/make-teams',
  
    /**
     * get discord auth token, then send that to backend to set a role
     */
    discord: BASE + '/discord',
    /**
     * Get buy-ins for user
     */
    getBuyIns: BASE + '/get-buy-ins',
  
    /**
      Update the buy ins for the user
    */
    updateBuyIns: BASE + '/update-buy-ins',
  
    /**
     * Get the points for the user
     */
    points: BASE + '/points',
  };