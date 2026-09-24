export type FontCategory = 'Elegant' | 'Signature' | 'Modern';

export interface CertificateFont {
  id: string;
  name: string;
  category: FontCategory;
  fontFamily: string;
  className: string;
  isRecommendedFor?: string[]; // template IDs
  styleBadge?: string; // e.g. "User Favorite", "Serif", "Calligraphy"
}

export interface FieldPosition {
  x: number; // percentage from left (0 - 100) or px in viewBox
  y: number; // percentage from top (0 - 100) or px in viewBox
  maxWidth: number; // max allowable width in viewBox units
  defaultFontSize: number;
  minFontSize: number;
  color: string;
  alignment: 'middle' | 'start' | 'end';
  letterSpacing?: string;
  textTransform?: 'uppercase' | 'capitalize' | 'none';
  fontWeight?: string | number;
}

export interface CertificateFields {
  recipientName: FieldPosition;
  courseName?: FieldPosition;
  date?: FieldPosition;
  instructorName?: FieldPosition;
  certificateId?: FieldPosition;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  viewBox: {
    width: number;
    height: number;
  };
  recommendedFontId: string;
  defaultValues: {
    recipientName: string;
    courseName?: string;
    date?: string;
    instructorName?: string;
    certificateId?: string;
  };
  fields: CertificateFields;
  // Custom uploaded image or background image URI
  backgroundUri?: string;
  customImageUri?: string;
}

export interface CertificateValues {
  recipientName: string;
  courseName?: string;
  date?: string;
  instructorName?: string;
  certificateId?: string;
}

export interface AutoFitResult {
  fontSize: number;
  isReduced: boolean;
  scaleRatio: number;
}
