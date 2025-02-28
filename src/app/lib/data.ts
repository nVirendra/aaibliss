import { MasterField } from './definitions';
import db from '../utils/db';
import Master from '../models/Master';

interface GroupedMasterData {
  BUSINESS_TYPE: MasterField[];
  BUSINESS_CATEGORY: MasterField[];
}

export async function fetchGroupMasters(): Promise<GroupedMasterData | null> {
  try {
    await db.connect();

    // Fetch data without `.lean()`
    const masters = await Master.find({
      master_group: { $in: ['BUSINESS_TYPE', 'BUSINESS_CATEGORY'] },
    });

    // Convert Mongoose documents to plain JavaScript objects
    const plainMasters: MasterField[] = masters.map((doc) => doc.toObject());

    const groupedData: GroupedMasterData = {
      BUSINESS_TYPE: [],
      BUSINESS_CATEGORY: [],
    };

    plainMasters.forEach((item) => {
      if (item.master_group === 'BUSINESS_TYPE') {
        groupedData.BUSINESS_TYPE.push(item);
      } else if (item.master_group === 'BUSINESS_CATEGORY') {
        groupedData.BUSINESS_CATEGORY.push(item);
      }
    });

    return groupedData;
  } catch (err) {
    console.error('Database Error:', err);
    return null;
  }
}
