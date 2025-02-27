import mongoose, { Schema, Document } from 'mongoose';

interface IRole extends Document {
  business_id: mongoose.Schema.Types.ObjectId | null;
  name: string;
}

const RoleSchema = new Schema<IRole>({
  business_id: { type: Schema.Types.ObjectId, ref: 'Business', default: null }, // null for global roles like Superadmin
  name: { type: String, required: true, unique: true },
});

// Insert default roles if they do not exist
RoleSchema.statics.initializeDefaultRoles = async function () {
  const defaultRoles = [
    {
      business_id: null,
      name: 'Superadmin',
      status: 'active',
    },
    {
      business_id: null,
      name: 'Admin',
      status: 'active',
    },
  ];

  for (const role of defaultRoles) {
    const existingRole = await this.findOne({ name: role.name });
    if (!existingRole) {
      await this.create(role);
      console.log(`Role '${role.name}' created.`);
    }
  }
};

const Role = mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
export default Role;
