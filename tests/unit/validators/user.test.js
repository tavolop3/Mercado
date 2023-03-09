const { User } = require('../../../models/user');

describe('user create joi validation', () => {
    let user = {
        email: 'gargamel@gmail.com',
        password: '12345678',
        repeat_password: '12345678',
        username: 'gargamel',
        phone: '+54 2251 679980',
        name: 'Gargamel',
        last_name: 'Lemagrag',
        birth_date: new Date('1940-01-01')
    }

    it('should be ok given a valid user', () => {
        const{ error } = User.validateCreate(user);

        expect(error).not.toBeDefined();
    });

    it('should return error given an invalid repeat password', () => {
        user.repeat_password = 'another different password';

        const{ error } = User.validateCreate(user);

        expect(error).toBeDefined();
    });

    it('should return error given an invalid young birth date < 18', () => {
        user.birth_date = new Date('2010-01-01');

        const{ error } = User.validateCreate(user);

        expect(error).toBeDefined();
    });

    it('should return error given an invalid young birth date > 120', () => {
        user.birth_date = new Date('1900-01-01');

        const{ error } = User.validateCreate(user);

        expect(error).toBeDefined();
    });
});

describe('user login joi validation', () => {
    it('should be ok given a valid user with username and not email', () => {
        const user = {
            username: 'gargamel',
            password: '12345678'
        }      

        const{ error } = User.validateLogin(user);
         
        expect(error).not.toBeDefined();   
    });

    it('should be ok given a valid user with email and not username', () => {
        const user = {
            email: 'gargamel@gmail.com',
            password: '123456789'
        }

        const { error } = User.validateLogin(user); 
        
        expect(error).not.toBeDefined();  
    });

    it('should return error given a user with both email and username', () => {
        const user = {
            email: 'gargamel@gmail.com',
            username: 'gargamel',
            password: '123456789'
        }

        const { error } = User.validateLogin(user); 
        
        expect(error).toBeDefined();  
    });

    it('should return error given a user without both email and username', () => {
        const user = {
            password: '123456789'
        }

        const { error } = User.validateLogin(user); 
        
        expect(error).toBeDefined();  
    });
});

