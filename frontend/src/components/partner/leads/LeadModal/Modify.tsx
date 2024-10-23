import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Checkbox, TextInput } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button";
import { useLead } from "@/src/context/Lead";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { Lead } from "@/src/types/lead";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  close: () => void;
  id: string;
  setLead: (data: Lead) => void;
}

const Modify: React.FC<Props> = ({ close, id, setLead }) => {
  const { addNotification } = useToastNotification();
  const { updateStatus } = useLead();

  const [approving, setApproving] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    time: "",
    date: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const modifyLead = async () => {
    try {
      setApproving;
      const res = await updateStatus(id, {
        status: "Modify",
      });
      addNotification({ message: "Lead Modified" });
      close();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setApproving(false);
    }
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date"); // Control for date or time mode

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDateTime(); // Close picker after selection on Android
      }
      if (mode === "date") {
        handleInputChange("date", currentDate.toDateString());
      } else if (mode === "time") {
        handleInputChange(
          "time",
          currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    } else {
      toggleDateTime();
    }
  };

  const confirmDateTime = () => {
    if (mode === "date") {
      handleInputChange("date", date.toDateString());
    } else if (mode === "time") {
      handleInputChange(
        "time",
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
    toggleDateTime();
  };

  const toggleDateTime = () => {
    setShow(!show);
  };

  const toggleMode = (newMode: "date" | "time") => {
    setMode(newMode);
    setShow(true);
  };

  return (
    <View>
      <Text style={styles.title}>Modify Lead</Text>
      <Text style={{ marginBottom: 10 }}>Adjust Leads detail</Text>

      <View>
        <TextInput
          mode="outlined"
          label="Enter Amount"
          keyboardType="numeric"
          value={`${formData.price}`}
          onChangeText={(text) => handleInputChange("price", text)}
          style={[styles.input, { paddingLeft: 20 }]}
        />
        <FontAwesome style={styles.currency} name="dollar" size={16} />
      </View>

      {show && (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode} // Set mode to date or time
            display="spinner"
            is24Hour={true}
            onChange={onChange}
          />
          {Platform.OS === "ios" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBottom: 20,
                gap: 20,
                marginTop: -20,
              }}
            >
              <Button
                variant="outlined"
                onPress={toggleDateTime}
                containerStyle={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button onPress={confirmDateTime} containerStyle={{ flex: 1 }}>
                Confirm
              </Button>
            </View>
          )}
        </>
      )}

      {/* Date Selector */}
      {!show && (
        <Pressable onPress={() => toggleMode("date")}>
          <TextInput
            mode="outlined"
            placeholder="Change Date"
            value={formData.date}
            style={[styles.textContainer]}
            editable={false}
            onPress={() => toggleMode("date")}
          />
          <Ionicons name="calendar-outline" style={styles.calendar} size={18} />
        </Pressable>
      )}

      {/* Time Selector */}
      {!show && (
        <Pressable onPress={() => toggleMode("time")}>
          <TextInput
            mode="outlined"
            placeholder="Change Time"
            value={formData.time}
            style={styles.textContainer}
            editable={false}
            onPress={() => toggleMode("time")}
          />
          <Ionicons name="time-outline" style={styles.calendar} size={18} />
        </Pressable>
      )}

      <Button onPress={modifyLead} loading={approving}>
        Save
      </Button>
    </View>
  );
};

export default Modify;

const styles = StyleSheet.create({
  title: { fontSize: 24, marginBottom: 5, fontWeight: "500" },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: "#626262",
    textTransform: "capitalize",
  },
  input: {
    marginBottom: 20,
    height: 40,
  },
  currency: {
    position: "absolute",
    left: 10,
    top: 19,
  },
  textContainer: { height: 40, marginBottom: 20 },
  calendar: { position: "absolute", right: 4, top: 10 },
});
