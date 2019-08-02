import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppAction from "../../actions";
import FormTextInput from "../../components/common/FormTextInput";
import AuthButton from "../../components/common/AuthButton";
import constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

var ImagePicker = NativeModules.ImageCropPicker;

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    image: null
  };

  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: "MediumQuality",
      includeExif: true
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    // const { username, password, email, phone_number } = this.state;
    try {
      // console.log("user successfully signed up!: ", success);
    } catch (err) {
      // console.log("error signing up: ", err);
    }
  };
  render() {
    console.log("=========ImagePicker========", ImagePicker);
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: moderateScale(10)
          }}
        >
          <TouchableOpacity
            onPress={() => this.pickSingle(false)}
            style={styles.button}
          >
            <Image
              style={{
                height: moderateScale(80),
                width: moderateScale(80)
              }}
              source={constants.Images.Common.logoBase64}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          style={{
            maxHeight: constants.BaseStyle.DEVICE_HEIGHT * 0.75
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormTextInput icon={"user"} placeHolderText={"Name"} />
          <FormTextInput icon={"envelope"} placeHolderText={"Email"} />
          <FormTextInput
            icon={"lock"}
            secureText
            placeHolderText={"Password"}
          />
          <FormTextInput
            icon={"lock"}
            secureText
            placeHolderText={"Confirm Password"}
          />
          <FormTextInput icon={"phone"} placeHolderText={"Phone Number"} />
          <AuthButton
            buttonName="Sign Up"
            gradientColors={["#f55010", "#f55010"]}
            textStyle={{ color: constants.Colors.White }}
          />
        </KeyboardAwareScrollView>

        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                paddingVertical: moderateScale(20)
              }}
            >
              {`Already Have an Account? `}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(16),
                fontWeight: "bold",
                color: "#f55010",
                paddingVertical: moderateScale(20)
              }}
              onPress={() => this.props.AppAction.pop(this.props.componentId)}
            >
              Login
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly"
  }
});
