pipeline {
    agent {
        dockerfile true
    }

    stages {
        stage('init') {
            steps {
               sh 'node --version'
            }
        }

        stage('install') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            stes {
                sh 'npm run test:unit'
            }
        }

        stage('build') {
            stes {
                sh "npm run build-${env.BRANCH_NAME}"
            }
        }
    }
}
