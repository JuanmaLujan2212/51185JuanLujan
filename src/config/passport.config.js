import passport from 'passport';
import local from 'passport-local';
import userService from '../Dao/models/user.js';
import { createHash, validatePassword } from '../utils.js';
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;

const initializePassport = () => {


    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, 
        async (req,username, password,done) =>{
            const { first_name, last_name, email,age, rol, cartid } = req.body;
            console.log(cartid)
            try {
                const user = await userService.findOne({email:username}); 
                if(user){
                    console.log('El usuario existe');
                    return done(null,false);
                }
                const newUser = {
                    first_name, 
                    last_name, 
                    email, 
                    age, 
                    rol,
                    password: createHash(password),
                    cart: cartid
                }

                const result = await userService.create(newUser);
                return done(null, result);

            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    passport.deserializeUser( async (id, done)=>{
        const user = await userService.findById(id);
        done(null, user)
    });

    passport.use('login', new LocalStrategy({usernameField:'email'}, async (username, password, done)=>{

        try {
           
           const user = await userService.findOne({email:username})
           //console.log(user);
            if(!user){
                console.log('No existe el usuario');
                return done(null, false);
            }
            if(!validatePassword(password,user)) return done (null, false);
            return done(null,user);

        } catch (error) {
            
            return done("Error al intentar ingresar: " + error);
            
        }

    }))
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.4454a608745e685d',
        clientSecret:'d689f07e36cfb39501deb76068e505b473b72a6b',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'

    }, async (accesToken, refreshToken,profile,done)=>{
        try {
            
            const name = profile.username;
            let user = await userService.findOne({email: profile._json.email})
            if(!user){

                const newUser = {
                    first_name: name,
                    last_name: "",
                    email: profile._json.email,
                    age: 18,
                    password: ''
                }

                const result = await userService.create(newUser);
                done(null,result)
            }else{
                done(null, user)
            }

        } catch (error) {
            return done(null,error)
        }
    }))
}

export default initializePassport;
