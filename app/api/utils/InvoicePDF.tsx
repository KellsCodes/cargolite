import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import React from 'react';

// Standard Professional Styles
const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 10, fontFamily: 'Helvetica', color: '#333', backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, borderBottomWidth: 2, borderBottomColor: '#034460', borderBottomStyle: 'solid', paddingBottom: 20 },
  logoSection: { flexDirection: 'row', alignItems: 'center' },
  logoTextMain: { fontSize: 26, fontWeight: 'bold', color: '#034460' }, // Primary
  logoTextAccent: { fontSize: 26, fontWeight: 'bold', color: '#FFB240' }, // Secondary
  invoiceInfo: { textAlign: 'right' },
  invoiceTitle: { fontSize: 20, fontWeight: 'bold', color: '#034460', marginBottom: 4 },
  
  addressBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40, marginTop: 20 },
  addressCol: { width: '45%' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', marginBottom: 6, color: '#034460', textTransform: 'uppercase', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 2 },
  infoText: { marginBottom: 2, lineHeight: 1.4 },

  // Table using Flexbox (No 'display: table' error)
  table: { marginTop: 10, borderWidth: 1, borderColor: '#eee', borderStyle: 'solid' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', borderBottomStyle: 'solid', alignItems: 'center', minHeight: 30 },
  tableHeader: { backgroundColor: '#f4f7f9' },
  tableRowLast: { borderBottomWidth: 0 },
  
  colDescription: { width: '60%', paddingLeft: 10, fontWeight: 'bold' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '25%', textAlign: 'right', paddingRight: 10 },

  totalSection: { marginTop: 30, flexDirection: 'row', justifyContent: 'flex-end' },
  totalContainer: { width: '40%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', borderBottomStyle: 'solid' },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingVertical: 8, backgroundColor: '#034460', color: '#fff', paddingHorizontal: 10, borderRadius: 2 },
  grandTotalText: { fontSize: 14, fontWeight: 'bold' },

  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, textAlign: 'center', color: '#999', fontSize: 9, borderTopWidth: 1, borderTopColor: '#eee', borderTopStyle: 'solid', paddingTop: 10 }
});

export const InvoicePDF = ({ invoice }: { invoice: any }) => (
  <Document title={`Invoice-${invoice.transactionID}`}>
    <Page size="A4" style={styles.page}>
      {/* Brand Header */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Text style={styles.logoTextMain}>CARGO</Text>
          <Text style={styles.logoTextAccent}>LITE</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={{ fontWeight: 'bold' }}>Reference: {invoice.transactionID}</Text>
          <Text>Date Issued: {new Date(invoice.createdAt).toLocaleDateString()}</Text>
          <Text>Status: {invoice.invoiceStatus}</Text>
        </View>
      </View>

      {/* Addresses */}
      <View style={styles.addressBox}>
        <View style={styles.addressCol}>
          <Text style={styles.sectionTitle}>Client / Bill To</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{invoice.client.name}</Text>
          <Text style={styles.infoText}>{invoice.client.email}</Text>
          <Text style={styles.infoText}>{invoice.client.telephone}</Text>
        </View>
        <View style={styles.addressCol}>
          <Text style={styles.sectionTitle}>Shipment Summary</Text>
          <Text style={styles.infoText}>Shipment ID: {invoice.shipment?.shipmentID || 'N/A'}</Text>
          <Text style={styles.infoText}>From: {invoice.shipment?.pickupLocation}</Text>
          <Text style={styles.infoText}>To: {invoice.shipment?.dropLocation}</Text>
          <Text style={styles.infoText}>Method: {invoice.paymentMethod}</Text>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.colDescription}>Service Description</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.colDescription}>
            Logistics: {invoice.shipment?.packageType || 'Freight'} Handling
          </Text>
          <Text style={styles.colQty}>1</Text>
          <Text style={styles.colPrice}>${Number(invoice.amount).toFixed(2)}</Text>
        </View>
        {/* Placeholder for additional fees if needed */}
        <View style={[styles.tableRow, styles.tableRowLast]}>
          <Text style={styles.colDescription}>Service Fee / Insurance</Text>
          <Text style={styles.colQty}>1</Text>
          <Text style={styles.colPrice}>$0.00</Text>
        </View>
      </View>

      {/* Calculations */}
      <View style={styles.totalSection}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>${Number(invoice.amount).toFixed(2)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalText}>Total Amount</Text>
            <Text style={styles.grandTotalText}>${Number(invoice.amount).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Cargolite Logistics - Delivering Excellence Worldwide</Text>
        <Text style={{ marginTop: 4 }}>This is a computer-generated document. No signature required.</Text>
      </View>
    </Page>
  </Document>
);
