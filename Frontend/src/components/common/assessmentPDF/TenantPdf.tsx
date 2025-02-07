import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Tenant } from "@/types/DataProps"; // Assuming your Tenant type is in DataProps
import pfp from "@/assets/avatar-default.png";

interface Props {
  tenant: Tenant;
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
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginBottom: 10,
    color: "#34495e",
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  photoBox: {
    width: 100,
    height: 100,
    border: "1px solid #ccc",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginBottom: 10,
    borderRadius: 8,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textGroup: {
    marginBottom: 8,
  },
  textItem: {
    lineHeight: 1.5,
  },
});

const renderField = (label: string, value?: string | number) =>
  value ? (
    <View style={styles.textGroup}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.textItem}>{value}</Text>
    </View>
  ) : null;

export const TenantPdfComponent = ({ tenant }: Props) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image
          src={(tenant.is_business_tenant ? tenant.business_photo : tenant.private_photo) || pfp}
          style={styles.logo}
        />
        <Text style={styles.title}>TENANT INFORMATION</Text>
      </View>

      {/* Identification Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>I - TENANT IDENTIFICATION</Text>
        {tenant.is_business_tenant ? (
          <>
            {renderField("Company Name", tenant.business_company_name)}
            {renderField("Business Registration Number", tenant.business_business_registration_number)}
            {renderField("Industry Sector", tenant.business_industry_sector)}
            {renderField("Taxpayer Account Number", tenant.business_taxpayer_account_number)}
            {renderField("Manager Name", tenant.business_manager_name)}
            {renderField("Manager Gender", tenant.business_manager_gender)}
            {renderField("Manager Date of Birth", tenant.business_manager_date_of_birth)}
            {renderField("Manager Place of Birth", tenant.business_manager_place_of_birth)}
            {renderField("Manager Document Number", tenant.business_manager_document_number)}
            {renderField("Manager Expiry Date", tenant.business_manager_expiry_date)}
          </>
        ) : (
          <>
            {renderField("Name", `${tenant.private_name} ${tenant.surname}`)}
            {renderField("Gender", tenant.private_gender)}
            {renderField("Date of Birth", tenant.private_birth_date)}
            {renderField("Place of Birth", tenant.private_place_of_birth)}
            {renderField("Nationality", tenant.private_nationality)}
            {renderField("Document Type", tenant.private_document_type)}
            {renderField("Document Number", tenant.private_document_number)}
            {renderField("Expiry Date", tenant.private_expiry_date)}
            {renderField("Occupation", tenant.private_occupation)}
          </>
        )}
      </View>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>II - CONTACT INFORMATION</Text>
        {tenant.is_business_tenant ? (
          <>
            {renderField("Office Phone", tenant.business_office_phone_number)}
            {renderField("WhatsApp Contact", tenant.business_whatsapp_contact)}
            {renderField("Email", tenant.business_email)}
            {renderField("Head Office Address", tenant.business_head_office)}
          </>
        ) : (
          <>
            {renderField("Contact Number", tenant.private_contact)}
            {renderField("WhatsApp", tenant.private_whatsapp_contact)}
            {renderField("Email", tenant.private_email)}
            {renderField("Mail Box", tenant.private_mail_box)}
            {renderField("Marital Status", tenant.private_marital_status)}
          </>
        )}
      </View>

      {/* Emergency Contact Section */}
      {!tenant.is_business_tenant && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III - EMERGENCY CONTACT INFORMATION</Text>
          {renderField("Emergency Contact Name", tenant.private_emergency_contact_name)}
          {renderField("Emergency Contact Number", tenant.private_emergency_contact)}
          {renderField("Relationship", tenant.private_emergency_contact_relation)}
        </View>
      )}
    </Page>
  </Document>
);
