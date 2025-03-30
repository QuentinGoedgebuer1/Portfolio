import Aura from "@primeng/themes/aura";
import { definePreset } from "@primeng/themes";

const MyTheme = definePreset(Aura, {
    components: {
            card: {
                root:{
                    shadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
                },
                body: {
                    padding: "3rem",
                }
            }
    },
    semantic: {
        primary: {
            50: "#f2f2f2",
            100: "#c2c2c2",
            200: "#919191",
            300: "#616161",
            400: "#303030",
            500: "#000000",
            600: "#000000",
            700: "#000000",
            800: "#000000",
            900: "#000000",
            950: "#000000"
        },
    }
});

export default MyTheme;