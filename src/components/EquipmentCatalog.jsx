import { equipment, categories } from '../data/equipment';
import { EquipmentCategory } from './EquipmentCategory';

export function EquipmentCatalog() {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-dim)] mb-3">
        <span aria-hidden="true">🔧 </span>LEHR Equipment Catalog
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
