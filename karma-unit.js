/**
 * From where to look for files, starting with the location of this file.
 */
basePath = '.';

/**
 * This is the list of file patterns to load into the browser during testing.
 */
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'bower_components/angular-unstable/angular.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'utils.js',
  'unit.spec.js'
];

reporters = ['dots'];

port = 9018;
runnerPort = 9100;
urlRoot = '/';

autoWatch = true;
logLevel = LOG_INFO;

/**
 * The list of browsers to launch to test on. This includes only "Firefox" by
 * default, but other browser names include:
 * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
 *
 * Note that you can also use the executable name of the browser, like "chromium"
 * or "firefox", but that these vary based on your operating system.
 *
 * You may also leave this blank and manually navigate your browser to
 * http://localhost:9018/ when you're running tests. The window/tab can be left
 * open and the tests will automatically occur there during the build. This has
 * the aesthetic advantage of not launching a browser every time you save.
 */
browsers = [
  'PhantomJS'
];

