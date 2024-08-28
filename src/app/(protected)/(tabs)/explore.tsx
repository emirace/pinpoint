import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Surface, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import Select from "@/src/components/Select";
import BottomSheetComponent from "@/src/components/BottomSheetComponent";
import Filter from "@/src/components/Filter";
import { router } from "expo-router";
import MultiSelect from "@/src/components/select/MultiSelect";
import { StatusBar } from "expo-status-bar";

type Option = {
  label: string;
  value: string | number;
};

const productOptions: {
  label: string;
  value: string;
  detailOptions: Option[];
}[] = [
  {
    label: "Clothing",
    value: "Clothing",
    detailOptions: [
      { label: "Shirt", value: "Shirt" },
      { label: "Shorts", value: "Shorts" },
      { label: "Jackets", value: "Jackets" },
    ],
  },
  {
    label: "Electronics",
    value: "Electronics",
    detailOptions: [
      { label: "Phone", value: "Phone" },
      { label: "Laptop", value: "Laptop" },
    ],
  },
];

const serviceOptions: {
  label: string;
  value: string;
  detailOptions: Option[];
}[] = [
  {
    label: "Consulting",
    value: "Consulting",
    detailOptions: [
      { label: "Business", value: "Business" },
      { label: "Technology", value: "Technology" },
    ],
  },
  {
    label: "Tutoring",
    value: "Tutoring",
    detailOptions: [
      { label: "Math", value: "Math" },
      { label: "Science", value: "Science" },
    ],
  },
];

type Item = {
  id: string;
  name: string;
  price: string;
  image: any;
};

const products: Item[] = [
  {
    id: "1",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "2",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "3",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "4",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "5",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
  {
    id: "6",
    name: "Product Name",
    price: "$10.99",
    image: require("../../../../assets/images/product.png"),
  },
];

const Discover = () => {
  const { colors } = useTheme();
  const [selectedItem, setSelectedItem] = useState("Products");
  const [selectedType, setSelectedType] = useState("Clothing");
  const [selectedDetail, setSelectedDetail] = useState("Shirt");
  const [selectedTypeValues, setSelectedTypeValues] = useState<
    (string | number)[]
  >([]);
  const [selectedDetailValues, setSelectedDetailValues] = useState<
    (string | number)[]
  >([]);

  const handleValueChange = (value: string | number) => {
    // Handle value change logic
  };

  const getOptions = () => {
    if (selectedItem === "Products") return productOptions;
    if (selectedItem === "Services") return serviceOptions;
    return [];
  };

  const renderHeader = () => {
    const options = getOptions();

    // Get the detail options based on the first selected type
    const selectedTypeOptions = options
      .filter((option) => selectedTypeValues.includes(option.value))
      .flatMap((option) => option.detailOptions);

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>What are you looking for?</Text>
        <View style={styles.buttonGroup}>
          <ItemButton
            label="Services"
            icon={
              <Ionicons
                name="person-outline"
                size={24}
                color={getColor("Services")}
              />
            }
            selected={selectedItem === "Services"}
            onPress={() => setSelectedItem("Services")}
          />
          <ItemButton
            label="Products"
            icon={<Feather name="box" size={24} color={getColor("Products")} />}
            selected={selectedItem === "Products"}
            onPress={() => setSelectedItem("Products")}
          />
        </View>
        <View style={styles.selectGroup}>
          <MultiSelect
            placeholder="Select type..."
            selectedValues={selectedTypeValues}
            onValuesChange={(values) => setSelectedTypeValues(values)}
            options={options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            containerStyle={styles.selectContainer}
          />
          <MultiSelect
            placeholder="Select details..."
            selectedValues={selectedDetailValues}
            onValuesChange={(values) => setSelectedDetailValues(values)}
            options={selectedTypeOptions}
            containerStyle={styles.selectContainer}
          />
        </View>
      </View>
    );
  };

  const RenderItem = ({ item }: { item: Item }) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <TouchableOpacity
        onPress={() => router.push("/service-detail")}
        style={styles.card}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text
          style={{ flexDirection: "row", alignItems: "center", color: "#888" }}
        >
          Buy Online - Shopping <Ionicons name="checkmark" size={12} />
        </Text>
        <TouchableOpacity
          onPress={() => setIsSelected(!isSelected)}
          style={{
            width: 20,
            height: 20,
            borderWidth: 2,
            borderRadius: 20,
            backgroundColor: isSelected ? colors.primary : "transparent",
            position: "absolute",
            borderColor: isSelected ? colors.primary : "gray",
            top: 10,
            right: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isSelected && (
            <Ionicons name="checkmark" color={"white"} size={14} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const getColor = (item: string) =>
    selectedItem === item ? colors.primary : "black";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={products}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.productGrid}
      />
      <BottomSheetComponent
        content={<Filter />}
        button={
          <Surface style={styles.filterButton}>
            <Text>Filter</Text>
            <Ionicons name="filter-sharp" size={18} />
          </Surface>
        }
        snapPoints={["80"]}
      />
    </SafeAreaView>
  );
};

const ItemButton = ({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: JSX.Element;
  selected: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();
  return (
    <Button
      variant="outlined"
      onPress={onPress}
      containerStyle={[
        styles.itemButton,
        selected && { borderColor: selected ? colors.primary : "black" },
      ]}
    >
      <View style={styles.itemButtonContent}>
        {icon}
        <Text
          style={[
            styles.itemButtonText,
            { color: selected ? colors.primary : "black" },
          ]}
        >
          {label}
        </Text>
      </View>
    </Button>
  );
};

export default Discover;

const WIDTH = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
  },
  productGrid: {
    paddingBottom: 15,
    gap: 25,
  },
  headerContainer: {
    paddingTop: 15,
  },
  headerTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  itemButton: {
    backgroundColor: "white",
    flex: 1,
  },
  itemButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemButtonText: {
    fontSize: 20,
  },
  selectGroup: {
    marginVertical: 30,
    gap: 10,
  },
  selectContainer: {
    backgroundColor: "white",
  },
  card: {
    borderRadius: 20,
    width: WIDTH / 2 - 22.5,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: WIDTH / 2 - 22.5,
    borderRadius: 20,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  filterButton: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 10,
    left: WIDTH / 2 - 50,

    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 5,
    padding: 3,
    borderRadius: 5,
  },
});
