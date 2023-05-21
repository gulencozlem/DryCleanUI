export interface Category {
  id: number;
  parentId: number;
  name: string;
  isPopular: boolean;
  addedAt: Date;
  isActive: boolean;
}
