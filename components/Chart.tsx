import { useRef,useEffect } from 'react';
import { select } from 'd3-selection';


const Circle = () => {
    const ref = useRef()
    useEffect(() => {
      const svgElement = select(ref.current)
      svgElement.append("circle")
        .attr("cx", 150)
        .attr("cy", 70)
        .attr("r",  50)
    }, [])
    return (
      <svg
        ref={ref}
      />
    )
  }
export default Circle;