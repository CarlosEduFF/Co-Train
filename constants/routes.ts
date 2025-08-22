

export const routes = {
    // Auth
    login: '/auth/login',
    register: '/auth/register',

    // Home (pasta home não detalhada, mas mantida)
    home: '/home',

    // Configurações / Perfil
    config: '/config',
    editProfile: '/config/EditarPerfil',
    viewProfile: '/config/perfil',

    // Grupos Musculares
    gruposMuscAdd: '/gruposMusc/FormAdicionar',
    gruposMuscEdit: '/gruposMusc/FormEditar',
    gruposMusc: '/gruposMusc',

    // Dieta
    dietaAdd: '/dieta/FormAdicionar',
    dietaEdit: '/dieta/formEditar',
    dietaMeals: '/dieta/meals',
    dieta: '/dieta',

    // Planejamentos
    planeAdd: '/planejamentos/AddScreen',
    planeView: '/planejamentos/ViewScreen',
    planeTrain: '/planejamentos/ViewTrain',
    plane: '/planejamentos'
} as const;
