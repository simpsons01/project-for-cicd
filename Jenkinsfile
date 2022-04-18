def getIsPr(env) {
   return env.BUILD_EVENT != "push"
}

def getStage(env) {
   def stage = env.BUILD_BRANCH
   return stage
}

pipeline {
    agent {
        label 'my-agent'
    }

    environment {
        IS_PR = getIsPr(env)
        STAGE = getStage(env)
        S3_BUCKET = 'simpsons-jenkins-lab'
    }

    stages {

        stage('echo env') {
            steps {
               echo "${env.IS_PR}"
               echo "${env.STAGE}"
               echo "${env.S3_BUCKET}"
               sh "node -v"
            }
        }

        // stage('start') {
        //     steps {
        //         withCredentials([string(credentialsId: 'GITHUB_STATUS_TOKEN', variable: 'GITHUB_STATUS_TOKEN')]) {
        //             sh ("""
        //                 curl \
        //                 -X POST \
        //                 -H \"Accept: application/vnd.github.v3+json\" \
        //                 -H \"Authorization: token ${GITHUB_STATUS_TOKEN}\" \
        //                 https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
        //                 -d \"{ \\"state\\":\\"pending\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
        //             """)
        //         }
        //     }
        // }

        stage('install') {
            steps {
               sh "npm install"
            }
        }

        stage('test') {
            when {
                expression {
                    return env.IS_PR == "true";
                }
            }
            steps {
                sh "npm run test:unit"
            }
        }

        stage('build') {
            when {
                expression {
                    return env.IS_PR == "false";
                }
            }
            steps {
                sh "npm run build-lab"
            }
        }

        stage('deploy') {
            when {
                expression {
                    return env.IS_PR == "false";
                }
            }
            steps {
                 sh "aws s3 cp ./dist s3://${S3_BUCKET}  --recursive"
            }
        }
    }

    // post {
    //     success {
    //         withCredentials([string(credentialsId: 'GITHUB_STATUS_TOKEN', variable: 'GITHUB_STATUS_TOKEN')]) {
    //           sh ("""
    //             curl \
    //               -X POST \
    //               -H \"Accept: application/vnd.github.v3+json\" \
    //               -H \"Authorization: token ${GITHUB_STATUS_TOKEN}\" \
    //               https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
    //               -d \"{ \\"state\\":\\"success\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
    //           """)
    //         }
    //     }
    //     failure {
    //         withCredentials([string(credentialsId: 'GITHUB_STATUS_TOKEN', variable: 'GITHUB_STATUS_TOKEN')]) {
    //           sh ("""
    //             curl \
    //               -X POST \
    //               -H \"Accept: application/vnd.github.v3+json\" \
    //               -H \"Authorization: token ${GITHUB_STATUS_TOKEN}\" \
    //               https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
    //               -d \"{ \\"state\\":\\"failure\\",  \\"context\\": \\"jenkins\\", \\"target_url\\": \\"${BUILD_URL}\\" }\" 
    //           """)
    //         }
    //     }
    // }
}