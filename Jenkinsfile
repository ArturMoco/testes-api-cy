pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/ArturMoco/testes-api-cy.git'
            }
        }
                stage('instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
               stage('instalar dependências2') {
            steps {
                bat 'npx cypress@9.7.0 install'
            }
        }
                stage('Executar testes') {
            steps {
                bat 'npx cypress@9.7.0 run set CYPRESS_VERIFY_TIMEOUT=100000'
            }
        }
    }
}