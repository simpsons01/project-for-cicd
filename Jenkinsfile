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

pipeline {
    agent {
        label 'docker-debian'
    }

    environment {
        PATH = "/home/jenkins/.nvm/versions/v14.15.1/bin:/home/jenkins/.nvm/versions/v14.15.1/bin:/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        IS_PR = getIsPr(env)
        STAGE = getStage(env)
    }

    stages {
        stage('init') {
            steps {
               echo "${env.IS_PR}"
               echo "${env.STAGE}"
               sh "node -v"
               sh "aws --version"
            }
        }
    }
}
