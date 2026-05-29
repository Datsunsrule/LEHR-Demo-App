import { equipment, getCategories } from '../data/equipment';
import { EquipmentCategory } from './EquipmentCategory';

export function EquipmentCatalog() {
  const categories = getCategories();

  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#888] mb-3">
        🔧 LEHR Equipment Catalog
      </p>
      <div className="flex flex-col gap-2">
        {categories.map((cat, idx) => (
          <EquipmentCategory
            key={cat}
            category={cat}
            items={equipment.filter((e) => e.category === cat)}
            defaultOpen={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
