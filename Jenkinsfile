def getIsPr(env) {
   return env.CHANGE_ID != null
}

def getStage(env) {
   boolean isPR = getIsPr(env)
   def stage = ''
   if(isPR) {
      stage = env.CHANGE_TARGET
   } else {
      stage = env.JOB_BASE_NAME
   }
   return stage
}

def getS3Bucket(env) {
    def s3Bucket = ''
    def stage = getStage(env)
    if(stage == 'lab') {
      s3Bucket = 'lab/bucket'
    }else if(stage == 'staging') {
      s3Bucket = 'staging/bucket'
    }else if(stage == 'production') {
       s3Bucket = 'production/bucket'
    }
    return s3Bucket
}

pipeline {
    agent {
        label 'docker-debian'
    }

    environment {
        PATH = "/home/jenkins/.nvm/versions/v14.15.1/bin:/home/jenkins/.nvm/versions/v14.15.1/bin:/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        IS_PR = getIsPr(env)
        STAGE = getStage(env)
        S3_BUCKET = getS3Bucket(env)
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
                sh "npm run build-${env.STAGE}"
            }
        }

        stage('deploy') {
            when {
                expression {
                    return env.IS_PR == "false";
                }
            }
            steps {
                sh "deploy to '${env.S3_BUCKET} to ${env.STAGE}'"
            }
        }
    }
}
