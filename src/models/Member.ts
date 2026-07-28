import mongoose, { Schema, Document, Model } from 'mongoose';

export type SubsystemType = 
  | 'software' 
  | 'mechanical' 
  | 'electronics' 
  | 'embedded' 
  | 'autonomous' 
  | 'management';

export type AcademicYearType = 
  | 'sophomore' 
  | 'pre-final year' 
  | 'final year' 
  | 'alumni';

export interface IAlumniDetails {
  company?: string;
  designation?: string;
  graduationYear?: number;
  currentLocation?: string;
}

export interface IMember {
  name: string;
  github?: string;
  linkedin?: string;
  email?: string;
  subsystem: SubsystemType;
  year: AcademicYearType;
  role?: string;
  image?: string;
  alumniInfo?: IAlumniDetails;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMemberDocument extends IMember, Document {}

const AlumniDetailsSchema = new Schema<IAlumniDetails>(
  {
    company: { type: String, trim: true },
    designation: { type: String, trim: true },
    graduationYear: { type: Number },
    currentLocation: { type: String, trim: true },
  },
  { _id: false }
);

export const MemberSchema = new Schema<IMemberDocument>(
  {
    name: { 
      type: String, 
      required: [true, 'Member name is required'], 
      trim: true 
    },
    github: { 
      type: String, 
      trim: true,
      default: '' 
    },
    linkedin: { 
      type: String, 
      trim: true,
      default: '' 
    },
    email: { 
      type: String, 
      trim: true,
      lowercase: true,
      default: '' 
    },
    subsystem: { 
      type: String, 
      required: [true, 'Subsystem is required'],
      enum: {
        values: ['software', 'mechanical', 'electronics', 'embedded', 'autonomous', 'management'],
        message: '{VALUE} is not a valid subsystem'
      },
      lowercase: true,
      trim: true
    },
    year: { 
      type: String, 
      required: [true, 'Academic year / status is required'],
      enum: {
        values: ['sophomore', 'pre-final year', 'final year', 'alumni'],
        message: '{VALUE} is not a valid year'
      },
      lowercase: true,
      trim: true
    },
    role: { 
      type: String, 
      default: 'Member',
      trim: true 
    },
    image: { 
      type: String, 
      default: '' 
    },
    alumniInfo: { 
      type: AlumniDetailsSchema, 
      required: false 
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for fast year & subsystem queries
MemberSchema.index({ year: 1, subsystem: 1 });

// Check if model exists before compiling to avoid overwrite errors in dev
export const MemberModel: Model<IMemberDocument> =
  mongoose.models.Member || mongoose.model<IMemberDocument>('Member', MemberSchema);

export default MemberModel;
