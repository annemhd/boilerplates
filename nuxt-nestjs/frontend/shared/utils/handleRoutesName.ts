export function renameRoute(routeName: string) {
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
        case 'account-settings-update-id':
            return 'Modifier mes informations'
        case 'account-settings-update-password-id':
            return 'Modifier mon mot de passe'
        default:
            return 'Sans titre'
    }
}

export function renamePath(routeName: string) {
     switch (routeName) {
    case 'account':
        return 'Mon compte';
    case 'update':
        return 'Modifier mes informations';
    case 'settings':
        return 'Paramètres du compte';
    case 'password':
        return 'Modifier mon mot de passe';
    default:
      return routeName;
  }
}

export default { renamePath, renameRoute}