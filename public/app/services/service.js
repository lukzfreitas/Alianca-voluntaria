angular.module('service', [])
// Cada function retorna um objeto promise
.factory('Organizacoes', ['$http', function($http){    
    return {        
        get : function() {                        
            return $http.get('/api/organizacoes');
        },
        create : function(data) {
            return $http.post('/api/organizacoes', data);
        },
        update : function(data) {
            return $http.put('/api/organizacoes', data);
        },                        
        delete : function(id) {
            return $http.delete('/api/organizacoes/' + id);
        },
        findByCNPJ : function(cnpj) {            
            return $http.get('/api/organizacoes?cnpj=' + cnpj);
        },
        findByAreaInteresse : function(area_interesse) {
            return $http.get('/api/organizacoes?area_interesse=' + area_interesse);
        }        
    }
}]
).factory('Voluntarios', ['$http', function($http){
    return {        
        get : function() {                        
            return $http.get('/api/voluntarios');
        },
        create : function(data) {
            return $http.post('/api/voluntarios', data);
        },
        update : function(data) {
            return $http.put('/api/voluntarios', data);
        },                        
        delete : function(id) {
            return $http.delete('/api/voluntarios/' + id);
        },
        findByCPF : function(cpf) {
            return $http.get('/api/voluntarios?cpf=' + cpf);
        },
        findByAreaInteresse : function(area_interesse) {
            return $http.get('/api/voluntarios?area_interesse=' + area_interesse);
        }
    }
}]
).factory('Oportunidades', ['$http', function($http){
    return {        
        get : function() {                        
            return $http.get('/api/oportunidades');
        },
        findOne : function(id) {
            return $http.get('api/oportunidades/' + id);
        },
        create : function(data) {
            return $http.post('/api/oportunidades', data);
        },
        update : function(data) {
            return $http.put('/api/oportunidades', data);
        },                        
        delete : function(id) {
            return $http.delete('/api/oportunidades/' + id);
        },  
        findByAreaInteresse : function(area_interesse) {
            return $http.get('/api/oportunidades?area_interesse=' + area_interesse);
        }
    }
}]
).factory('formatDateService', function () {
    return {
        formatDate : function (date) {
            var dateFormat = date.slice(0, 10).split('-');
            return dateFormat[2] + '/' + dateFormat[1] + '/' + dateFormat[0];
        }        
    }
})