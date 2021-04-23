const axios = require("axios");

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Indique por favor la URL del grupo:\n', (answer) => {
    // https://github.com/isa-group

    var url = "https://api.github.com/orgs/" + answer.split("https://github.com/")[1];

    const config = {
        method: 'get',
        url: url,
        headers: {Authorization: "token 25585b0ab7cde5f9f8dddf76eff7cb5a9e41db7e"}
    }


    axios(config).then((response) => {
        console.log("\nNombre: " + response.data.name + "\nDescripción: " + response.data.description + "\nEnlace: " + response.data.blog);
        console.log("\nRepositorios:");

        var repo_url = response.data.repos_url;
        const config = {
            method: 'get',
            url: repo_url + "?per_page=100",
            headers: {Authorization: "token 25585b0ab7cde5f9f8dddf76eff7cb5a9e41db7e"}
        }
        
        axios(config).then((response) => {
            var numPages = Number(response.headers.link.split("page=")[4].split(">;")[0]);
            var promises = [];
            for (let i = 1; i <= numPages; i++) {
                config.url = repo_url + "?page=" + i +"&per_page=100";
                const promise = axios(config).then((response) => {
                    return response.data;
                });
                promises.push(promise);
            }
            Promise.all(promises).then(response => {
                var lsIssuesNumber = [];
                var lsCommitsNumber = [];
                for (let j = 0; j < response.length; j++) {
                    var respuesta = response[j];
                    var listacommits = [];
                    var lsIssues = [];
                    var issuesDic = {}
                    for (let i = 0; i < respuesta.length; i++) {
                        var repo = respuesta[i];
                        console.log("    - " + repo.name + "\n        · Número de Issues abiertas: " + repo.open_issues);
                        //issuesDic[repo.name] = repo.open_issues;
                        

                        const config1 = {
                            method: 'get',
                            url: "https://api.github.com/repos/"+repo.full_name+"/issues",
                            headers: {Authorization: "token 25585b0ab7cde5f9f8dddf76eff7cb5a9e41db7e"}
                        }
                        const issueN = axios(config1).then((response) => {
                            return response.data;
                        });
                        lsIssues.push(issueN);

                        const config2 = {
                            method: 'get',
                            url: "https://api.github.com/repos/"+repo.full_name+"/commits",
                            headers: {Authorization: "token 25585b0ab7cde5f9f8dddf76eff7cb5a9e41db7e"}
                        }
                        const CM = axios(config2).then(async(responseC) => {
                            var res = 0;
                            try {
                                var nombre = responseC.data[0].url.split("https://api.github.com/repos/")[1].split("/")[1].toString();
                                res = Number(responseC.headers.link.split("page=")[2].split(">;")[0]);
                                var urlC = responseC.headers.link.split('rel="next", <')[1].split(res + '>; rel="last"')[0] + res;
                                var res = (res - 1) * 30;
                                const config3 = {
                                    method: 'get',
                                    url: urlC,
                                    headers: {Authorization: "token 25585b0ab7cde5f9f8dddf76eff7cb5a9e41db7e"}
                                }
                                
                                await axios(config3).then(async(responsecom) => {
                                    res += responsecom.data.length;
                                });
                            } catch (error) {

                            }
                            var CommitDic = {}
                            if(nombre in CommitDic) {
                                CommitDic[nombre] += res;
                            } else {
                                CommitDic[nombre] = res;
                            }
                            //console.log("    - " + nombre + "\n        · Número de Commits: " + res);
                            return CommitDic;//res
                        }).catch((err) => {

                        });
                        listacommits.push(CM);

                    }
                    const IS = Promise.all(lsIssues).then((response) => {
                        var totalIssues = 0;
                        var re = "";
                        for (let elem = 0; elem < response.length; elem++) {
                            var element = response[elem];
                            
                            try {
                                totalIssues += element[0].number;
                            } catch (error) {
                                
                            }
                        }
                    return totalIssues;
                    }).catch((err) => {
                        return err;
                    });
                    lsIssuesNumber.push(IS);

                    const CM2 = Promise.all(listacommits).then((response) => {
                        //console.log(response);
                        var totalCommits = 0;
                        for (let elem = 0; elem < response.length; elem++) {
                            var element = response[elem];
                            //console.log(Object.keys(element)[0])
                            try {
                                if (typeof element === 'undefined') {
                                    totalCommits += 0;
                                } else {
                                    for (var el in response[elem]) {
                                        console.log("    - " + el + "\n        · Número de Commits: " + response[elem][el]);
                                        totalCommits += response[elem][el];
                                    }
                                }
                            } catch (error) {
                                
                            }
                            
                        }
                    return totalCommits;
                    }).catch((err) => {
                        
                    });
                    lsCommitsNumber.push(CM2);
                }
                
                
                console.log("\n\n");
                Promise.all(lsCommitsNumber).then((response) => {
                    var pr = 0;
                    for (let p = 0; p < response.length; p++) {
                        pr += response[p];
                    }
                    console.log("\n\n\n    - Número de Commits en todos los repositorios: " + pr);
                    Promise.all(lsIssuesNumber).then((response) => {
                        var pr = 0;
                        for (let p = 0; p < response.length; p++) {
                            pr += response[p];
                        }
                        console.log("    - Número de Issues en todos los repositorios: " + pr);
                    });
                });
                                
            });
        });
    });

});