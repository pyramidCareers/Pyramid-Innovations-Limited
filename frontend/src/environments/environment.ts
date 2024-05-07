// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    base_URL: 'https://api.pyramid.careers',
    mentor_type_code: '33', //secret identifier for user logged in as mentor
    admin_type_code: '23', //secret identifier for user logged in as admin
    employer_type_code: '13', //secret identifier for user logged in as employer
    jobseeker_type_code: '37', //secret identifier for user logged in as jobseeker
    wstoken: '0b02a24e0e40e0252c441fb1bff32b08',
    moodle_base_URL: 'https://lms.pyramid.careers',
    jobseeker_profile_completion_code: '19', //secret identifier for jobseeker profile completion code
    employer_profile_completion_code: '49', //secret identifier for jobseeker profile completion code
    force_change_password_code: '29', //secret identifier for forcefully change employer login password code
    pusher_app_key: 'aaf61a681cc00fc7fa23',
    pusher_app_cluster: 'mt1',
    pet_category_id: 2,
    certified_exam_category_id: 3,
    ZOOM_SDK_KEY: 'aqegXY2kQmiUmswdWcy51A',
    ZOOM_SDK_SECRET: 'z6GPzKt16xor9zh4s1mV7cDHu7RsuUmd',
};

export const restrictedSubDomains = ['www','pyramid','dev','stage','prod']

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
