import classnames from 'classnames';
import GridItem from './GridItem';
import { RawProductForCard, SellerProfile } from '@/app/lib/definitions';
import styles from '@/app/ui/grid.module.css';

type Props = {
	items: RawProductForCard[] | SellerProfile[];
	customStyle?: string;
};

export default function Grid({ items, customStyle }: Props) {
	return (
		<section className={classnames(styles.grid, customStyle)}>
			{items.map((item) => (
				<GridItem key={item.id} item={item} />
			))}
		</section>
	);
}
