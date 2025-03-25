export function renameRoute(routeName: any) {
    switch (routeName) {
        case 'index':
            return 'Accueil'
        case 'authentication-signup':
            return "S'inscrire"
        case 'authentication-signin':
            return 'Se connecter'
        case 'account':
            return 'Mon compte'
        case 'account-settings-id':
            return 'Paramètres du compte'
        case 'account-settings-password-id':
            return 'Modifier mon mot de passe'
        case 'account-profile-id':
            return 'Mon profil'
        default:
            return 'Sans titre'
    }
}

export default { renameRoute }