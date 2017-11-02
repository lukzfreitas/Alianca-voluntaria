var app = angular.module('app', [    
    'ngMaterial',    
    'ngRoute',    
    'ngResource',   
    'ngMessages',
    'service',    
    'organizacoesController',
    'voluntariosController',
    'oportunidadesController',
    'modalOportunidadesController',    
    'modalEditarVoluntarioController',    
    'modalEditarOrganizacaoController',
    'modalEditarOportunidadeController',
    'modalDeletarOrganizacaoController',
    'modalDeletarVoluntarioController',
    'modalDeletarOportunidadeController',
    'modalCandidatarOportunidadesController',
    'ui.mask',
]);

app.config (function ($routeProvider, $mdIconProvider) {    
    $routeProvider
    .when("/", {
        controller: "homeController",
        templateUrl: "app/views/home.html"       
    })    
    .when("/organizacoes", {
        controller: "organizacoesController",
        templateUrl: "app/views/organizacoes.html",        
    })
    .when("/voluntarios", {
        controller: "voluntariosController",
        templateUrl: "app/views/voluntarios.html"
    })
    .when("/oportunidades", {
        controller: "oportunidadesController",
        templateUrl: "app/views/oportunidades.html"
    })
    .when("/nova-organizacao", {
        controller: "organizacoesController",
        templateUrl: "app/views/novaOrganizacao.html"
    })
    .when("/novo-voluntario", {
        controller: "voluntariosController",
        templateUrl: "app/views/novoVoluntario.html"
    })    
    .when("/nova-oportunidade", {
        controller: "oportunidadesController",
        templateUrl: "app/views/novaOportunidade.html"
    })    
    .otherwise({redirectTo: "/"});
    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
    $mdIconProvider.fontSet('md', 'material-icons');
});

