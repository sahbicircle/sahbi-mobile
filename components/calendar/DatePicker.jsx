import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./DatePicker.styles";

function partsFromIso(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return null;
  return { d, m, y };
}

export default function DatePicker({ t, form, show, update, setShow }) {
  const selectedDate = form.birthday ? new Date(form.birthday) : null;
  const formatDate = (date) => date.toISOString().split("T")[0];
  const dmy = form.birthday ? partsFromIso(form.birthday) : null;

  // Handler for web input change
  const handleWebChange = (e) => {
    update("birthday", e.target.value);
  };

  if (Platform.OS === "web") {
    return (
      <TextInput
        style={selectedDate ? styles.inputText : styles.placeholder}
        type="date"
        value={selectedDate ? formatDate(selectedDate) : ""}
        placeholder={t("register.birthday.placeholder")}
        max={formatDate(new Date())}
        onChange={handleWebChange}
      />
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
        {dmy ? (
          <View style={styles.dmyRow}>
            <Text style={styles.dmyPart}>{dmy.d}</Text>
            <Text style={styles.dmySlash}> / </Text>
            <Text style={styles.dmyPart}>{dmy.m}</Text>
            <Text style={styles.dmySlash}> / </Text>
            <Text style={styles.dmyPart}>{dmy.y}</Text>
          </View>
        ) : (
          <View style={styles.dmyRow}>
            <Text style={styles.placeholderGhost}>DD</Text>
            <Text style={styles.dmySlash}> / </Text>
            <Text style={styles.placeholderGhost}>MM</Text>
            <Text style={styles.dmySlash}> / </Text>
            <Text style={styles.placeholderGhost}>YYYY</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* iOS */}
      {show && Platform.OS === "ios" && (
        <Modal transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.pickerCard}>
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                textColor="#000"
                style={{ alignSelf: "center" }}
                onChange={(event, date) => {
                  if (date) update("birthday", formatDate(date));
                }}
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShow(false)}
              >
                <Text style={styles.cancelText}>{t("common.done")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Android */}
      {show && Platform.OS === "android" && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, date) => {
            setShow(false);
            if (event.type === "set" && date) {
              update("birthday", formatDate(date));
            }
          }}
        />
      )}
    </>
  );
}
