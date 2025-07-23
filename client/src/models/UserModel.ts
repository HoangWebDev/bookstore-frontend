class UserModel {
    userId: number;
    userName: string;
    passwordHash: string;
    fullName: string;
    role: string;
    createdAt: Date;
    constructor(userId: number, userName: string, passwordHash: string, fullName: string, role: string, createdAt: Date) {
        this.userId = userId;
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
        this.role = role;
        this.createdAt = createdAt;
    }
}

export default UserModel