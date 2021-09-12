import LoaderAnimationAtom from "../atoms/load/LoaderAnimationAtom"
import MaskAtom from "../atoms/MaskAtom"

export type Props = {
  isOpen: boolean
}

const LoaderAnimationMaskMolecule = ({ isOpen }: Props) => {
  return (
    <MaskAtom isOpen={isOpen}>
      <LoaderAnimationAtom />
    </MaskAtom>
  )
}

export default LoaderAnimationMaskMolecule
