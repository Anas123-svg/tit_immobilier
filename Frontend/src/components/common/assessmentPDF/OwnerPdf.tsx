import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "@/assets/logo.jpg";
import { Assessment, OwnerPdf } from "@/types/DataProps";
import pfp from "@/assets/avatar-default.png"
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 120,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2a3d66",
    borderBottom: "2px solid #d9d9d9",
    paddingBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2a3d66",
    paddingBottom: 4,
    borderBottom: "2px solid #d9d9d9",
  },
  flaggedSectionHeader: {
    color: "#d9534f", // Deep red for flagged items
  },
  fieldContainer: {
    fontSize: 12,
    color: "#444",
    lineHeight: 1.5,
    marginBottom: 8,
  },
  flaggedFieldContainer: {
    color: "#d9534f", // Deep red text for flagged fields
  },
  fieldLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  tableContainer: {
    borderTop: "1px solid #e3e3e3",
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2a3d66",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    width: "25%",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#f7f9fc",
  },
  tableRowAlternate: {
    backgroundColor: "#e8f0f9",
  },
  tableCell: {
    fontSize: 10,
    color: "#333",
    width: "25%",
    textAlign: "center",
  },
  rowTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2a3d66",
    width: "25%",
    paddingRight: 6,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },
  image: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    marginVertical: 4,
  },
  feedbackSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #d9d9d9",
  },
  feedbackText: {
    fontSize: 12,
    color: "#333",
    lineHeight: 1.5,
  },
});

export const OwnerPdfComponent = ({ ownerPdf }: { ownerPdf: OwnerPdf }) => {
    const { owner, template } = ownerPdf;
  
    return (
      <Document>
        <Page style={styles.page}>
          {/* Owner Name */}
          <Text style={styles.header}>{owner.private_name || "Owner Details"}</Text>
  
          {/* Template Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Template Fields</Text>
            {template.fields.map((field, idx) => (
              <Text key={idx} style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>{field.label}: </Text>
                {Array.isArray(field.value) ? field.value.join(", ") : field.value || "N/A"}
              </Text>
            ))}
          </View>
  
          {/* Template Tables */}
          {template.tables.map((table, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.sectionHeader}>{table.table_name}</Text>
              {/* Table Columns */}
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  {table.table_data.columns.map((col, colIndex) => (
                    <Text key={colIndex} style={styles.tableHeaderText}>
                      {col}
                    </Text>
                  ))}
                </View>
                {/* Table Rows */}
                {Object.entries(table.table_data.rows).map(([rowKey, rowVal], rowIndex) => (
                  <View key={rowIndex} style={styles.tableRow}>
                    <Text style={styles.rowTitle}>{rowKey}</Text>
                    {Object.values(rowVal).map((cell, cellIndex) => (
                      <Text key={cellIndex} style={styles.tableCell}>
                        {cell}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </Page>
      </Document>
    );
  };
  