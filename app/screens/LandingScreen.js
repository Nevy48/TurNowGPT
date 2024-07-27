import { Link } from 'expo-router';
import { Text, Image, StyleSheet, View, Pressable } from "react-native";
import designer from "../../assets/designer-working.png";
import turnow from "../../assets/TurNow.png";

export function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/landingTopDesktop.png")} style={styles.image} />
      </View>
      <View>
        <Image source={turnow} style={styles.turnow} />
      </View>
      <View>
        <Image source={designer} style={styles.designer} />
      </View>
      <Link asChild href="/LogIn">
      <Pressable style={styles.botonLogIn}>
        <Text style={styles.textoBotonLogIn}>Iniciar sesión</Text>
      </Pressable>
      </Link>
      <Link asChild href="/SignUp">
      <Pressable style={styles.botonSignUp}>
        <Text style={styles.textoBotonSignUp}>Registrarse</Text>
      </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#182248",
  },
  turnow: {
    top: -220,
  },
  designer: {
    top: -20,
  },
  textoBotonLogIn: {
    color: "#182248",
    fontWeight: "bold"
  },
  textoBotonSignUp: {
    color: "#FFF",
    fontWeight: "bold"
  },
  botonLogIn: {
    backgroundColor: "#FFF",
    height: 50,
    width: 250,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  botonSignUp: {
    backgroundColor: "#182248",
    height: 50,
    width: 250,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FFF",
    borderWidth: 2,
    top: 20,
    justifyContent: "center",
  },
});
