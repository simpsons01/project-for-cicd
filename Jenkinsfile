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
            steps {
                sh 'npm run test:unit'
            }
        }

        stage('build') {
            steps {
                sh "npm run build-${env.BRANCH_NAME}"
            }
        }
    }
}
