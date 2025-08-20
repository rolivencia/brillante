type EnvironmentType = 'development' | 'staging' | 'production'

interface Environment {
    secret: string;
    mySqlDatabase: string;
    environment: EnvironmentType
}

export default {
  secret: process.env['SECRET'] || '',
  mySqlDatabase: process.env['MYSQL_DATABASE'] || '',
  environment: process.env['ENVIRONMENT'] as EnvironmentType || 'development'
} satisfies Environment;
