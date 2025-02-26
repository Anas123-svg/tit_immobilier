import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Good } from "@/types/DataProps";

interface Props {
  good?: Good;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  propertyImage: {
    width: 120,
    height: 80,
    objectFit: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#34495e",
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
  },
  textGroup: {
    marginBottom: 12, // Increased from 8
    paddingRight: 15, // Added horizontal padding
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4, // Added space between label and value
  },
  textItem: {
    lineHeight: 1.5,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 15, // Added gap between grid items
  },
  gridItem: {
    width: "45%", // Reduced from 50% to account for gap
    marginBottom: 10, // Increased from 8
  },
  featuresGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15, // Increased gap
  },
  featureItem: {
    backgroundColor: "#e8f5e9",
    padding: 8, // Increased from 5
    borderRadius: 4,
    marginRight: 8, // Increased from 5
    marginBottom: 8, // Increased from 5
  },
  valueContainer: {
    marginTop: 2, // Added space between label and value
  },
});

const renderField = (label: string, value?: string | number | boolean) => {
  if (value === undefined || value === null) return null;
  const displayValue =
    typeof value === "boolean" ? (value ? "Yes" : "No") : value;

  return (
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.textItem}>{displayValue}</Text>
      </View>
    </View>
  );
};

export const GoodPdfComponent = ({ good }: Props) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        {good?.photo && <Image src={good.photo} style={styles.propertyImage} />}
        <Text style={styles.title}>PROPERTY INFORMATION</Text>
      </View>

      {/* Basic Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - BASIC INFORMATION</Text>
        <View style={styles.grid}>
          {renderField("Property Name", good?.property_name)}
          {renderField("Property Type", good?.type_of_property)}
          {renderField("Sale Type", good?.sale_type)}
          {renderField("Owner", good?.owner)}
          {renderField("Domain Type", good?.domain_type)}
          {renderField("Status", good?.status)}
          {renderField("Market Value", good?.market_value)}
        </View>
      </View>

      {/* Location Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>II - LOCATION DETAILS</Text>
        <View style={styles.grid}>
          {renderField("City", good?.city)}
          {renderField("Municipality", good?.municipality)}
          {renderField("Neighborhood", good?.neighborhood)}
          {renderField("Island", good?.island)}
          {renderField("Batch", good?.batch)}
          {renderField("Block", good?.block)}
          {renderField("Longitude", good?.longitude)}
          {renderField("Latitude", good?.latitude)}
        </View>
      </View>

      {/* Property Specifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>III - PROPERTY SPECIFICATIONS</Text>
        <View style={styles.grid}>
          {renderField("Number of Floors", good?.number_of_floors)}
          {renderField("Number of Levels", good?.number_of_levels)}
          {renderField("Area (m²)", good?.area_m2)}
          {renderField("Height", good?.height)}
          {renderField("Altitude", good?.altitude)}
          {renderField("Parking Spaces", good?.number_of_parking_spaces)}
          {renderField("Number of Rentals", good?.number_of_rentals)}
        </View>
      </View>

      {/* Features and Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IV - FEATURES & AMENITIES</Text>
        <View style={styles.featuresGrid}>
          {renderField("Garden", good?.garden)}
          {renderField("Pool", good?.pool)}
          {renderField("On the Corner", good?.on_the_corner)}
          {renderField("Near Water", good?.near_water)}
          {renderField("Feet in Water", good?.feet_in_water)}
          {renderField("Distance from Water", good?.distance_from_water)}
          {renderField("On Main Road", good?.on_main_road)}
          {renderField("Distance from Road", good?.distance_from_road)}
          {renderField("Dry Land", good?.dry_land)}
          {renderField("Low Depth", good?.low_depth)}
          {renderField("School Nearby", good?.school_nearby)}
          {renderField("Market Nearby", good?.market_nearby)}
        </View>
      </View>

      {/* Utilities and Identifiers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>V - UTILITIES & IDENTIFIERS</Text>
        <View style={styles.grid}>
          {renderField("CIE Identifier", good?.cie_identifier_number)}
          {renderField("SODECI Identifier", good?.sodeci_identifier_number)}
          {renderField("Boundary Marking", good?.boundary_marking_done)}
          {renderField("Has Title Deed", good?.has_title_deed)}
          {renderField("Serviced", good?.serviced)}
          {renderField("Type of Numbering", good?.type_of_numbering)}
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VI - ADDITIONAL INFORMATION</Text>
        {renderField("Description", good?.description)}
        {renderField("Other Type", good?.other_type)}
        {renderField("Assigned Agents", good?.assigned_agents?.join(", "))}
        {renderField("Created At", good?.created_at)}
        {renderField("Last Updated", good?.updated_at)}
      </View>
    </Page>
  </Document>
);
