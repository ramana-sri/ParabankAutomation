//  const { execSync } = require('child_process');

//     async function globalTeardown() {
//       // Generate Allure report
//       console.log('Generating Allure report...');
//       try {
//         execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
//         console.log('Allure report generated successfully in allure-report folder.');
//         execSync('npx allure open allure-report', { stdio: 'inherit' });
//       } catch (error) {
//         console.error('Error generating Allure report:', error.message);
//       }
//     }

//     module.exports = globalTeardown;