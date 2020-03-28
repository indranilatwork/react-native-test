import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    DatePickerAndroid,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            text: '',
            loginData: {},
            signUpData: {},
            login: true
        }
    }

    async selectDate() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
              console.log('DatePickerAndroid', year, month, day);
              this.setState({...this.state, signUpData: {...this.state.signUpData, dob: `${day}/${month+1}/${year}`}});
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    login() {
        if (this.state.login) {
            if (this.state.loginData.email && this.state.loginData.password) {
                AsyncStorage.getItem('users').then(data => {
                    if (!data) {
                        ToastAndroid.show('No user found', ToastAndroid.SHORT)
                    } else {
                        let users = JSON.parse(data);
                        let user = users.find(user => ((user.email === this.state.loginData.email) && (user.password === this.state.loginData.password)))
                        if (user) {
                            ToastAndroid.show('Welcome' + user.name, ToastAndroid.SHORT);
                            this.props.navigation.navigate('Home');
                        } else {
                            ToastAndroid.show('Invalid credential, try again', ToastAndroid.SHORT);
                        }
                    }
                })
            } else {
                ToastAndroid.show('All fields are required', ToastAndroid.SHORT)
            }
        } else {
            if (this.state.signUpData.name && 
                this.state.signUpData.name &&
                this.state.signUpData.name &&
                this.state.signUpData.name 
            ) {
                AsyncStorage.getItem('users').then(data => {
                    let users;
                    if (!data) {
                        users = [];
                    } else {
                        users = JSON.parse(data);
                    }
                    users.push(this.state.signUpData);
                    AsyncStorage.setItem('users', JSON.stringify(users)).then(() => {
                        ToastAndroid.show('Data Saved', ToastAndroid.SHORT);
                        this.setState({login: false});
                    });
                });
            } else {
                ToastAndroid.show('All fields are required', ToastAndroid.SHORT);
            }
        }
        
    }
    
    render() {
        let loginFrom = (
            <React.Fragment>
                <TextInput style={styles.input} placeholder='Email' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, loginData: {...this.state.loginData, email: text}})}
                value={this.state.loginData.email} />
                <TextInput style={styles.input} placeholder='Password' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, loginData: {...this.state.loginData, password: text}})}
                value={this.state.loginData.password} />
            </ React.Fragment>
        );
        let signUpForm = (
            <React.Fragment>
                <TextInput style={styles.input} placeholder='Name' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, signUpData: {...this.state.signUpData, name: text}})}
                value={this.state.signUpData.name} />
                <TextInput style={styles.input} placeholder='Email' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, signUpData: {...this.state.signUpData, email: text}})}
                value={this.state.signUpData.email} />
                <TextInput style={styles.input} placeholder='Phone' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, signUpData: {...this.state.signUpData, phone: text}})}
                value={this.state.signUpData.phone} />
                <TextInput style={styles.input} placeholder='Date of Birth' placeholderTextColor='gray'
                onTouchStart={() => this.selectDate()}
                value={this.state.signUpData.dob} />
                <TextInput style={styles.input} placeholder='Password' placeholderTextColor='gray'
                onChangeText={(text) => this.setState({...this.state, signUpData: {...this.state.signUpData, password: text}})}
                value={this.state.signUpData.password} />
            </ React.Fragment>
        );

        let footer = <View style={styles.footerBox}></View>;

        return (
            <KeyboardAvoidingView style={styles.container}  behavior={Platform.Os == "ios" ? "padding" : "height"}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Just Login</Text>
                </View>
                <View style={styles.middileBox}>
                    <LinearGradient 
                    colors={this.state.login ? ['#d86eb8', '#579ff7'] : ['#579ff7', '#d86eb8'] } 
                    style={[styles.linearGradient, this.state.login? styles.gradientLeft: styles.gradientRight]} 
                    locations={[0.1, 0.7]}
                    useAngle={true} 
                    angle={this.state.login ? 45 : -45}>
                    </LinearGradient>
                    <View style={styles.loginWrapper}>
                        <View style={styles.titleWrapper}>
                            <TouchableOpacity style={[styles.title, styles.left]} onPress={() => this.setState({...this.state, login: true})}>
                                <Text style={[styles.titleTxt, this.state.login ? styles.whiteTxt : styles.grayText]}>Login</Text>
                            </TouchableOpacity>
                            <View style={[styles.triangle, this.state.login ? styles.traingleLeft : styles.triangleRight]}></View>
                            <TouchableOpacity style={[styles.title, styles.right]} onPress={() => this.setState({...this.state, login: false})}>
                                <Text style={[styles.titleTxt, this.state.login ? styles.grayText : styles.whiteTxt]}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.loginBox}>
                            <View style={styles.form}>
                                {this.state.login ? loginFrom : signUpForm}
                            </View>
                            <View style={styles.curvy}>
                                <Image
                                style={styles.curvyImage}
                                source={require('./../../assets/imgs/curvy.png')}
                                />
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={() => this.login()}>
                                <Text style={styles.btnText}>{this.state.login ? 'Login' : 'Sign up'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.state.login ? footer : null}
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        // height: Dimensions.get('window').height,
        // display: 'flex'
    },
    headerWrapper: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#c7c7c7',
        fontSize: 40
    },
    footerBox: {
        flex:1,
    },
    linearGradient: {
        flex:1,
        width:'100%',
        height: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position: 'absolute',
        shadowColor: '#000000',
        shadowOffset: {height:0, width: 3},
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 20,
        top: 0
    },
    gradientRight: {
        right: '-50%'
    },
    gradientLeft: {
        left: '-50%'
    },

    middileBox: {
        flex:6,
        marginBottom:20
    },
    input: {
        borderColor: 'gray',
        borderBottomWidth: 1,
    },
    loginBox: {
        padding: 20,
        width: '90%',
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {height:0, width: 3},
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 20
    },
    titleWrapper: {
        height: 40,
        width: '90%',
        // backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 80
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 30,
        borderBottomWidth: 30,
        borderLeftWidth: 30,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        borderLeftColor: 'transparent',
        position: 'absolute',
        bottom: 0
    },
    traingleLeft: {
        left: '30%'
    },
    triangleRight: {
        right: '30%',
    },
    title: {
        flex:1,
        //alignItems: 'center'
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    whiteTxt: {
        color: 'white'
    },
    grayText: {
        color: '#c7c7c7'
    },
    titleTxt: {
        fontSize: 20,
    },
    curvy: {
        height: 70,
        marginLeft: -20,
        marginRight: -20,
        marginBottom: -20,
        marginTop: 50,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
    },
    form: {
        marginTop: 30
    },
    btn: {
        backgroundColor:'#59c8f9',
        position: 'absolute',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 30,
        paddingRight: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        bottom: -15, 
        left: '40%',
        elevation: 20
    }, 
    btnText: {
        color: 'white',
        fontSize: 15
    },
    curvyImage: {
        width: '100%',
        flex:1,
        resizeMode: 'stretch',
        bottom: 0
    },
    loginWrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

// AppRegistry.registerComponent('Login', () => Login);

// Navigation.registerComponent(`navigation.Login`, () => Login);
export default Login;