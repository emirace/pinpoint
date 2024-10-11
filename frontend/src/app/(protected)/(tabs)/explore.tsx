import React, { useEffect, useState } from "react";
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
import { Surface, TextInput, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import BottomSheetComponent from "@/src/components/BottomSheetComponent";
import Filter from "@/src/components/Filter";
import { router } from "expo-router";
import MultiSelect from "@/src/components/select/MultiSelect";
import { StatusBar } from "expo-status-bar";
import {
  productOptions,
  products,
  serviceOptions,
  services,
} from "@/src/utils/data/explore";
import { IProduct, Product } from "@/src/types/product";
import Rating from "@/src/components/Rating";
import { useProduct } from "@/src/context/Product";
import { useService } from "@/src/context/Service";
import { IService } from "@/src/types/service";
import { imageURL } from "@/src/services/api";

const Discover = () => {
  const { colors } = useTheme();
  const { fetchProducts } = useProduct();
  const { fetchServices } = useService();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [selectedItem, setSelectedItem] = useState("Products");
  const [selectedTypeValues, setSelectedTypeValues] = useState<string[]>([]);
  const [selectedDetailValues, setSelectedDetailValues] = useState<string[]>(
    []
  );
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [inShopOnly, setInShopOnly] = useState<boolean>();
  const [availableOnline, setAvailableOnline] = useState<boolean>();
  const [options, setOptions] = useState<{ [key: string]: string }>({});
  const [debouncedSearch, setDebouncedSearch] = useState(search); // New state for debounced search

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler); // Clear timeout if the effect is re-run
    };
  }, [search]);

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);
        const result = await fetchServices({
          page,
          limit,
          search: debouncedSearch,
          category: selectedTypeValues.length > 0 ? selectedTypeValues : [],
          subCategory:
            selectedDetailValues.length > 0 ? selectedDetailValues : [],
          inShopOnly,
          availableOnline,
          options,
        });
        setServices(result);
        console.log(result);
      } catch (error: any) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    const getProducts = async () => {
      try {
        setLoading(true);
        const result = await fetchProducts({
          page,
          limit,
          search: debouncedSearch,
          category: selectedTypeValues.length > 0 ? selectedTypeValues : [],
          subCategory:
            selectedDetailValues.length > 0 ? selectedDetailValues : [],
          inShopOnly,
          availableOnline,
          options,
        });
        setProducts(result);
      } catch (error: any) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };

    getServices();
    getProducts();
  }, [
    page,
    limit,
    debouncedSearch,
    selectedTypeValues,
    selectedDetailValues,
    inShopOnly,
    availableOnline,
    options,
  ]);

  const getOptions = () => {
    if (selectedItem === "Products") return productOptions;
    if (selectedItem === "Services") return serviceOptions;
    return [];
  };

  const handleSelect = (value: string) => {
    if (isSelected.includes(value)) {
      setIsSelected(isSelected.filter((item) => item !== value));
    } else {
      setIsSelected([...isSelected, value]);
    }
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
            onPress={() => {
              setSelectedItem("Services");
              setSelectedTypeValues([]);
            }}
          />
          <ItemButton
            label="Products"
            icon={<Feather name="box" size={24} color={getColor("Products")} />}
            selected={selectedItem === "Products"}
            onPress={() => {
              setSelectedItem("Products");
              setSelectedTypeValues([]);
            }}
          />
        </View>

        <TextInput
          mode="outlined"
          placeholder="Search Categories"
          left={<TextInput.Icon icon="magnify" />}
          value={search}
          onChangeText={(text) => setSearch(text)}
          outlineStyle={{ borderRadius: 10, borderColor: "#e1e1e1e1" }}
          style={{ height: 50, marginVertical: 20 }}
        />
        <View style={styles.selectGroup}>
          <MultiSelect
            placeholder="Select type..."
            modalTitle={
              selectedItem === "Products"
                ? "Product Categories"
                : "Service Categories"
            }
            selectedValues={selectedTypeValues}
            onValuesChange={(values) =>
              setSelectedTypeValues(values as string[])
            }
            options={options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            containerStyle={styles.selectContainer}
          />
          <MultiSelect
            placeholder="Select details..."
            modalTitle={
              (selectedTypeValues as unknown as string) + " Subcategories"
            }
            selectedValues={selectedDetailValues}
            onValuesChange={(values) =>
              setSelectedDetailValues(values as string[])
            }
            options={selectedTypeOptions}
            containerStyle={styles.selectContainer}
          />
        </View>
      </View>
    );
  };

  const RenderItem = ({ item }: { item: IProduct & IService }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname:
              selectedItem === "Products"
                ? "/product-detail"
                : "/service-detail",
            params: { id: item._id },
          })
        }
        style={styles.card}
      >
        <Image
          source={{ uri: imageURL + item.images[0] }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {selectedItem === "Products"
            ? `$${item.price}`
            : item.priceType === "flat"
            ? item.price
            : `$${item.priceRange?.from} - $${item.priceRange?.to}`}
        </Text>
        <View style={{ marginBottom: 5 }}>
          <Rating rating={item.rating} textStyle={{ color: "black" }} />
        </View>
        <Text
          style={{ flexDirection: "row", alignItems: "center", color: "#888" }}
        >
          {item.options?.map((option) => option.optionName)}{" "}
          <Ionicons name="checkmark" size={12} />
        </Text>
        {selectedItem === "Services" && (
          <TouchableOpacity
            onPress={() => handleSelect(item._id)}
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: 10,
              right: 10,
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderRadius: 20,
                backgroundColor: isSelected.includes(item._id)
                  ? colors.primary
                  : "transparent",
                borderColor: isSelected ? colors.primary : "gray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isSelected.includes(item._id) && (
                <Ionicons name="checkmark" color={"white"} size={14} />
              )}
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const getColor = (item: string) =>
    selectedItem === item ? colors.primary : "black";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {renderHeader()}
      <FlatList
        data={selectedItem === "Products" ? products : services}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />
      {isSelected.length > 0 && (
        <Button
          onPress={() => {
            setIsSelected([]);
            router.push("/inquire");
          }}
          containerStyle={{ marginTop: 10 }}
        >
          Send Leads
        </Button>
      )}
      <BottomSheetComponent
        content={(close) => (
          <Filter
            close={close}
            options={options}
            setIsOnlineShopping={setAvailableOnline}
            setOptions={setOptions}
            isOnlineShopping={availableOnline}
            count={
              selectedItem === "Products" ? products.length : services.length
            }
            setInShopOnly={setInShopOnly}
            inShopOnly={inShopOnly}
          />
        )}
        button={
          <Surface
            style={[
              styles.filterButton,
              {
                bottom: isSelected.length > 0 ? 60 : 10,
              },
            ]}
          >
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
    marginBottom: 30,
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
    paddingHorizontal: 10,
    left: WIDTH / 2 - 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 5,
    padding: 3,
    borderRadius: 5,
  },
});
