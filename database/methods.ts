import { hashIt } from "../validation/checks";
import { User } from "./models";

export async function fetchUser(username: string) {
    return await User.findByPk(username);
}

export async function createUser(username: string, password: string, email: string) {
    const hashedPasswd = await hashIt(password);
    return await User.create({
        username: username,
        password: hashedPasswd,
        email: email
    });
}

export async function updateUserLocation(username: string, location: string) {
    return await User.update({
        currentLocation: location
    }, {
        where: {
            username: username
        }
    });
}