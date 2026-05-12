import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import Icon from '../icon/Icon';
import { ResponseInventoriesInfo } from '../../types/inventory';

interface InventoryCardProps {
    inventory: ResponseInventoriesInfo;
    index?: number;
}

const InventoryCard: React.FC<InventoryCardProps> = React.memo(({ inventory, index = 0 }) => {
    const { id, title, imagePath, lists } = inventory;
    const navigate = useNavigate();

    const handleExplore = () => navigate(`/inventario/${id}`);

    return (
        <div className="group relative aspect-square rounded-2xl overflow-hidden card-shadow hover-lift bg-yp-deep">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,31,54,0.35) 0%, rgba(0,31,54,0.85) 100%), url(${imagePath})`,
                }}
            />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/85">
                <span className="font-mono text-[10.5px] tracking-[0.25em]">
                    INVENTARIO · {String(index + 1).padStart(2, '0')}
                </span>
                <span className="size-1.5 rounded-full bg-accent" />
            </div>

            <div className="absolute inset-x-4 bottom-4 flex flex-col text-white">
                <h3 className="font-display font-extrabold text-2xl uppercase leading-tight mb-3">{title}</h3>

                {lists.length > 0 && (
                    <ul className="grid gap-1 mb-4">
                        {lists.slice(0, 5).map((item) => (
                            <li key={item.id} className="flex items-center gap-2 text-[13px] text-white/80 hover:text-white">
                                <span className="text-accent">•</span>
                                <Link
                                    to={`/inventario/${id}`}
                                    state={{ listId: item.id }}
                                    className="transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <Button
                    type="button"
                    onClick={handleExplore}
                    className="inline-flex items-center justify-center gap-2 bg-accent text-yp-deep font-semibold text-[12.5px] px-4 py-2.5 rounded-full hover:brightness-95 transition w-fit"
                >
                    Explorar
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
});

InventoryCard.displayName = 'InventoryCard';

export default InventoryCard;
