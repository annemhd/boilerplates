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
            return 'Paramètre du compte'
        case 'account-update-id':
            return 'Modifier mes informations'
        default:
            return 'Sans titre'
    }
}

export function renamePath(routeName: string) {
     switch (routeName) {
    case 'account':
        return 'Compte';
    case 'update':
        return 'Modifier';
    case 'settings':
        return 'Paramètres';
    default:
      return routeName; // Return the original segment if no match
  }
}

export default { renamePath, renameRoute}