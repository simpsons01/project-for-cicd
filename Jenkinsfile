// def getIsPr(env) {
//     if(env.BRANCH_ID.equals('')) {
//         return false
//     } else {
//         return true 
//     }
// }

// def getStage(env) {
//     def stage = ''
//    if(env.GITHUB_BRANCH.equals('^PR')) {
       
//    } else {
//       stage = env.GITHUB_BRANCH.replace("commits/", '')
//    }
// }

pipeline {
    agent {
        label 'docker-debian'
    }

    environment {
        PATH = '/home/jenkins/.nvm/versions/v14.15.1/bin:/home/jenkins/.nvm/versions/v14.15.1/bin:/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }

    stages {
        stage('init') {
            steps {
               sh 'printenv'
            }
        }
    }
}
