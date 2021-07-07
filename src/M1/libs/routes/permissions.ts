import { permissions } from './constants';

// Function for checking the role in given permmisions
const hasPermission = (moduleName: string, role: string, permissionType: string): boolean => {
    console.log('permission', moduleName, role, permissionType);
    if (permissions.hasOwnProperty(moduleName)) {
        return (permissions[moduleName][permissionType].includes(role)) ||
            (permissions[moduleName].all && permissions[moduleName].all.includes(role));
    }
    return false;
};

export default hasPermission;