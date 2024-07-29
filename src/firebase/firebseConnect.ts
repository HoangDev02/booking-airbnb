import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private configService: ConfigService) {
    const serviceAccountPath: string = this.configService.get<string>('FIREBASE_SERVICE_ACCOUNT_PATH');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://testfirebase-39a62.appspot.com',
      databaseURL: `https://testfirebase-39a62-default-rtdb.firebaseio.com`,
    });
  }
  
  async uploadFile(buffer: Buffer, destination: string): Promise<string> {
    try {
      if (!buffer) {
        throw new BadRequestException('buffer is required');
      }

      // Create a temporary file path
      const tempFilePath = path.join(__dirname, `${uuidv4()}.webp`);
      await fs.writeFile(tempFilePath, buffer);

      const bucket = admin.storage().bucket();
      const file = await bucket.upload(tempFilePath, {
        destination: destination,
        metadata: {
          contentType: 'image/webp',
        },
      });

      // Clean up the temporary file
      await fs.remove(tempFilePath);

      const fileUrl = await file[0].getSignedUrl({
        action: 'read',
        expires: '03-17-2025',
      });
      
      return fileUrl[0];
    } catch (error) {
      this.logger.error(`Error uploading file to Firebase: ${error.message}`, error.stack);
      throw new BadRequestException('Error uploading file to Firebase');
    }
  }
}
