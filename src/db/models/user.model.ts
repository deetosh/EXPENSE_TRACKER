import { Model,DataTypes,Optional,Sequelize } from "sequelize";
import bcrypt from 'bcryptjs'
import EXTR_DB from '../database'
const dbConn = EXTR_DB.getConnection();

interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    verified: boolean;
    refresh_token: string | null;
}

// Define the input attributes for creating a new User
/*
  We have to declare the AuthorCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'verified' | 'refresh_token' | 'password'> {}

// Extend Sequelize's Model class with the User attributes and creation attributes
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public verified!: boolean;
    public refresh_token!: string | null;
  
    // Timestamps
    public createdAt!: Date;
    public updatedAt!: Date;
  
    // Static methods for password hashing and comparison
    static async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    }
  
    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
    }
  
    static associate(models: any): void {
      // Define associations here if needed
    }
  }

    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: 'id'
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'first_name',
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'last_name',
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
          field: 'email',
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            len: [6, 100], // Password should be at least 6 characters
          },
          defaultValue: null,
          field: 'password',
        },
        createdAt:{
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt:{
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        role: {
          type: DataTypes.ENUM('user', 'admin'),
          allowNull: false,
          field: 'role',
          validate: {
            isIn: [['user', 'admin']],
          },
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          field: 'verified',
          defaultValue: 'true',
        },
        refresh_token: {
          type: DataTypes.STRING,
          field: 'refresh_token',
        }
      },
      {
        sequelize: dbConn,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,  // Enable createdAt and updatedAt
      }
    );

export default User;