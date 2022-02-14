docker run --name mysql57 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=jobboard -p 3306:3306 -d mysql:5.7

mutation{
createJob(input:
{
title: "React FullStack 2",
description:"Expert in React and Nodejs"
companyId: "2"
}){
title
id
description
}
}
