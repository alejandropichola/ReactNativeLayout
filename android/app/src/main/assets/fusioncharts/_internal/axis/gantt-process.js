import GanttCommonAxis,{extractAttribToEnd}from'./gantt-common';import{pluck,pluckNumber,getDashStyle,extend2,parseUnsafeString,setLineHeight,toPrecision,hasSVG,TRACKER_FILL}from'../lib/lib';import{convertColor}from'../lib/lib-graphics';let UNDEF;const DEFAULT_DASH_STYLE='none',PXSTRING='px',TRANSFORM='t0,0',DEFAULT_HOVER_ALPHA=30;class GanttProcessAxis extends GanttCommonAxis{getName(){return'GanttProcess'}configure(a){let b=this.config,c=this.getFromEnv('color-manager'),d=this.getFromEnv('dataSource'),e=d.chart;super.configure(a),b.lineColor=convertColor(pluck(e.gridbordercolor,c.getColor('gridColor')),pluckNumber(e.gridborderalpha,100)),b.lineThickness=pluckNumber(e.gridborderthickness,1),b.lineDashStyle=pluckNumber(e.gridborderdashed,0)?getDashStyle(pluckNumber(e.gridborderdashlen,1),e.gridborderdashgap,b.lineThickness):DEFAULT_DASH_STYLE,b.plotLineColor=convertColor(pluck(e.ganttlinecolor,c.getColor('gridColor')),pluckNumber(e.ganttlinealpha,100)),b.plotLineThickness=pluckNumber(e.ganttlinethickness,1),b.plotLineDashStyle=pluckNumber(e.ganttlinedashed,0)?getDashStyle(pluckNumber(e.ganttlinedashlen,1),e.ganttlinedashgap,b.lineThickness):DEFAULT_DASH_STYLE,b.gridResizeBarColor=convertColor(pluck(e.gridresizebarcolor,c.getColor('gridResizeBarColor')),pluckNumber(e.gridresizebaralpha,100)),b.gridResizeBarThickness=pluckNumber(e.gridresizebarthickness,1),b.forceRowHeight=pluckNumber(e.forcerowheight,0),b.rowHeight=pluckNumber(e.rowheight,0),b.hoverColor=pluck(e.processhoverbandcolor,e.hoverbandcolor,c.getColor('gridColor')),b.hoverAlpha=pluckNumber(e.processhoverbandalpha,e.hoverbandalpha,DEFAULT_HOVER_ALPHA),b.useHover=pluckNumber(e.showprocesshoverband,e.showhoverband,e.showhovereffect,1),b.usePlotHover=pluckNumber(e.showganttpanehorizontalhoverband),b.showFullDataTable=pluckNumber(e.showfulldatatable,1),b.forceGanttWidthPercent=pluckNumber(e.forceganttwidthpercent,0),b.useVerticalScrolling=pluckNumber(e.useverticalscrolling,1),b.gridLineHeaderPath='',b.gridLinePath=''}setProcess(a){let b,c,d,e,f,g=this,h=g.config,i=h.startPad||0,j=h.endPad||0;if(h.processes={},a)h.hasProcess=1;else return void(h.hasProcess=0);for(c=h.processes.process=extend2({},a),extractAttribToEnd(c,{}),b=c.process.length,f=h.processes.processMap={},h.processes.processHeightMap={},d=0;d<b;d+=1)e=c.process[d],e.id&&(f[e.id.toLowerCase()]={catObj:e,index:d});g.setAxisRange({min:+toPrecision(-i,10),max:+toPrecision(b-1+j,10),tickInterval:+toPrecision(1,10)})}getProcessPositionByIndex(a){let b=this,c=b.config,d=c.processes.processHeightMap;return!!d[a]&&d[a]}getProcessPositionById(a){let b=this,c=b.config,d=c.processes&&c.processes.processMap[a],e=c.processes.processHeightMap;return!!d&&e[d.index]}setDataTable(a){var b=this,c=b.config;if(c.dataTables={},c.dataTables.dataTable={},a)c.hasDataTables=1;else return void(c.hasDataTables=0);extend2(c.dataTables.dataTable,a),a=c.dataTables.dataTable,extractAttribToEnd(a,{})}setProcessHeight(){var a,b,c,d=this,e=d.config,f=d.getFromEnv('chart'),g=f.config,h=g.canvasHeight,j=e.processes.process.process,k=e.processes.processHeightMap,l=e.processMaxHeight,m=0,n=e.forceRowHeight,o=e.rowHeight;for((l*j.length<h||0===e.useVerticalScrolling)&&(l=h/j.length),0===n?o&&o>l&&(l=o):l=o||l,(c=0,b=j.length);c<b;c++)a=pluckNumber(j[c].height,l),k[c]={top:m,bottom:m+a,height:a},m+=a;return m}adjustWidth(){var a,b,c,d,e,f,g,h,j,k,l=this,m=l.config,n=m.totalWidth,o=n,p=0,q=!1;if(a=m.processVlineArr=[],o-=20*(m.hasDataTables&&m.dataTables&&m.dataTables.dataTable&&m.dataTables.dataTable.datacolumn?m.dataTables.dataTable.datacolumn.length+1:1),c=function(a){var b;return o+=20,b=a.match(/%/g)?pluckNumber(n*+(a.replace(/%/g,'')/100),0):pluckNumber(a,0),20>o?b=20:b>o&&(b=o),o-=b,b},m.hasProcess&&(h=m.processes.process.process,d=m.processes.process,'right'===d.positioningrid&&(q=!0),b=h._attrib,e=p,p+=c(b.width||''+(b.rightPos-b.leftPos)),b.leftPos=e,b.rightPos=p,q?p=0:a.push({type:'process',ind:0,xPos:b.rightPos,left:b,leftLimit:b.leftPos+20})),m.hasDataTables)for(j in f=m.dataTables.dataTable.datacolumn,f)f.hasOwnProperty(j)&&'_attrib'!==j&&(g=f[j],b=g._attrib,e=p,p+=c(b.width||''+(b.rightPos-b.leftPos)),b.leftPos=e,b.rightPos=p,k=a[a.length-1],k&&(k.right=b,k.rightLimit=b.rightPos-20),a.push({type:'dataTable',ind:j,xPos:b.rightPos,left:b,leftLimit:b.leftPos+20}));m.hasProcess&&(q?(b=h._attrib,b.rightPos=p+(b.rightPos-b.leftPos),b.leftPos=p,p+=b.rightPos-b.leftPos,k=a[a.length-1],k&&(k.right=b,k.rightLimit=b.rightPos-20)):a.pop()),m.totalWidth=p}placeAxis(a){let b,c,d,e,f,g,h,k,l,m,n,o,p,q,r,s,t=this,u=t.config,v=t.getFromEnv('chart'),w=v.getFromEnv('smartLabel'),x=u.labels.style,y=4,z=0,A=0,B={left:0,right:0},C=0,D=!1,E=0,F=0,G=0;if(w.useEllipsesOnOverflow(v.config.useEllipsesWhenOverflow),w.setStyle({fontSize:x.fontSize,fontFamily:x.fontFamily,lineHeight:x.lineHeight,fontWeight:x.fontWeight}),(u.forceGanttWidthPercent||0===u.showFullDataTable)&&(G=a/((u.hasDataTables&&u.dataTables&&u.dataTables.dataTable&&u.dataTables.dataTable.datacolumn?u.dataTables.dataTable.datacolumn.length:0)+1)),u.hasProcess){for(o=u.processes.process.process,h=u.processes.process,'right'===h.positioningrid&&(D=!0),h.headertext&&(h.drawLabel=parseUnsafeString(h.headertext),g=h._attrib,k={fontFamily:pluck(g.headerfontfamily,x.fontFamily),fontSize:pluck(g.headerfontsize,x.fontSize).replace(/px/i,'')+PXSTRING,fontWeight:pluck(1===+g.headerisbold?'bold':'undefined'==typeof g.headerisbold?'bold':UNDEF,x.fontWeight),fontStyle:pluck(g.headerisitalic?'italic':UNDEF,x.fontStyle)},k.lineHeight=setLineHeight(k),w.setStyle(k),d=w.getOriSize(h.drawLabel),d.width>A&&(z=d,A=d.width)),(b=0,e=o.length);b<e;b++)f=o[b],g=f._attrib,f.drawLabel=parseUnsafeString(f.label||f.name),k={fontFamily:pluck(g.fontfamily,x.fontFamily),fontSize:pluck(g.fontsize,x.fontSize).replace(/px/i,'')+PXSTRING,fontWeight:pluck(g.isbold?'bold':UNDEF,x.fontWeight),fontStyle:pluck(g.isitalic?'italic':UNDEF,x.fontStyle)},k.lineHeight=setLineHeight(k),w.setStyle(k),d=w.getOriSize(f.drawLabel),d.width>A&&(z=d,A=d.width),d.height>F&&(F=d.height);u.processMaxHeight=F+8,o._attrib.leftPos=C,D?E=G||z.width+y:C+=G||z.width+y,o._attrib.rightPos=C}if(u.hasDataTables)for(b in l=u.dataTables.dataTable.datacolumn,l)if(l.hasOwnProperty(b)&&'_attrib'!==b){for(p in m=l[b],A=0,m.headertext&&(g=m._attrib,m.drawLabel=parseUnsafeString(m.headertext),r={fontFamily:pluck(g.headerfontfamily,x.fontFamily),fontSize:pluck(g.headerfontsize,x.fontSize).replace(/px/i,'')+PXSTRING,fontWeight:pluck(1===+g.headerisbold?'bold':'undefined'==typeof g.headerisbold?'bold':UNDEF,x.fontWeight),fontStyle:pluck(g.headerisitalic?'italic':UNDEF,x.fontStyle)},r.lineHeight=setLineHeight(r),w.setStyle(r),d=w.getOriSize(m.drawLabel),d.width>A&&(s=d,A=d.width)),n=m.text,n)n.hasOwnProperty(p)&&'_attrib'!==p&&(c=n[p],c.drawLabel=parseUnsafeString(c.label||c.name),q=c._attrib,r={fontFamily:pluck(q.fontfamily,x.fontFamily),fontSize:pluck(q.fontsize,x.fontSize).replace(/px/i,'')+PXSTRING,fontWeight:pluck(q.isbold?'bold':UNDEF,x.fontWeight),fontStyle:pluck(q.isitalic?'italic':UNDEF,x.fontStyle)},r.lineHeight=setLineHeight(r),w.setStyle(r),d=w.getOriSize(c.drawLabel),d.width>A&&(s=d,A=d.width));l[b]._attrib.leftPos=C,C+=G||s.width+y,l[b]._attrib.rightPos=C}return u.hasProcess&&D&&(o._attrib.leftPos+=C,o._attrib.rightPos+=C+E,C+=E),u.totalWidth=C,t.adjustWidth(),C=u.totalWidth>a?a:u.totalWidth,u.totalVisiblelWidth=C,B.left+=C,B}getProcessLen(){return this.config.processes.process.process.length}_drawProcessAndDataTable(){var a,b,c,d,e,f,g,h,k,l,m,n,o=this,p=o.config,q=o.getFromEnv('chart'),r=p.axisDimention||{},s=r.x,t=p.totalWidth||0,u=p.gridArr||(p.gridArr=[]),v=q.getChildren('canvas')[0],w=q.config,x=q.getFromEnv('animationManager'),y=v.canvasTop||w.canvasTop,z=v.canvasLeft||w.canvasLeft,A=v.canvasHeight||w.canvasHeight,B=v.canvasWidth||w.canvasWidth,C=q.getChildContainer('axisBottomGroup'),D=p.totalVisiblelWidth,E=0,F=0,G=o.getContainer('ganttPlotHoverBandContainer'),H=o.getContainer('ganttPlotLineContainer'),I=o.getContainer('headerContainer'),J=o.getContainer('headerBackContainer'),K=o.getContainer('headerLineContainer'),L=o.getContainer('headerTextContainer'),M=o.getContainer('labelContainer'),N=o.getContainer('labelBackContainer'),O=o.getContainer('labelLineContainer'),P=o.getContainer('labelTextContainer'),Q=o.getContainer('hotContainer');if(n=o.getContainer('ganttPlotHoverBandContainerParent')||o.addContainer('ganttPlotHoverBandContainerParent',x.setAnimation({el:'group',attr:{name:'gantt-plot-band-container-parent'},container:C,component:o})),o.addContainer('ganttPlotHoverBandContainer',x.setAnimation({el:G||'group',attr:{name:'gantt-plot-band-container',"clip-rect":z+','+y+','+B+','+A},container:n,component:o})),o.addContainer('ganttPlotLineContainer',x.setAnimation({el:H||'group',attr:{name:'gantt-plot-line-container',"clip-rect":z+','+y+','+B+','+A},container:C,component:o})),m={name:'gantt-header-container',"clip-rect":z-p.totalVisiblelWidth+','+(y-w.categorySpaceUsed)+','+p.totalVisiblelWidth+','+w.categorySpaceUsed},p.isDraged?delete m.transform:m.transform=TRANSFORM,I=o.addContainer('headerContainer',x.setAnimation({el:I||'group',attr:m,container:C,component:o})),J||(J=o.addContainer('headerBackContainer',x.setAnimation({el:'group',attr:{name:'gantt-header-back-container'},container:I,component:o}))),K||(K=o.addContainer('headerLineContainer',x.setAnimation({el:'group',attr:{name:'gantt-header-line-container'},container:I,component:o}))),L||(L=o.addContainer('headerTextContainer',x.setAnimation({el:'group',attr:{name:'gantt-header-text-container'},container:I,component:o}))),l={name:'gantt-label-container',"clip-rect":z-p.totalVisiblelWidth+','+y+','+p.totalVisiblelWidth+','+A},p.isDraged?delete l.transform:l.transform=TRANSFORM,M=o.addContainer('labelContainer',x.setAnimation({el:M||'group',attr:l,component:o,container:C})),N||(N=o.addContainer('labelBackContainer',x.setAnimation({el:'group',attr:{name:'gantt-label-back-container'},container:M,component:o}))),O||(O=o.addContainer('labelLineContainer',x.setAnimation({el:'group',attr:{name:'gantt-label-line-container'},container:M,component:o}))),P||(P=o.addContainer('labelTextContainer',x.setAnimation({el:'group',attr:{name:'gantt-label-text-container'},container:M,component:o}))),o.addContainer('hotContainer',x.setAnimation({el:Q||'group',attr:{name:'gantt-hot-container',"clip-rect":z-p.totalVisiblelWidth+','+(y-w.categorySpaceUsed)+','+p.totalVisiblelWidth+','+(A+w.categorySpaceUsed)},component:o,container:q.getContainer('parentgroup')})),p.gridLinePath='',p.gridLineHeaderPath='',p.hoverElemsArr=[],p.labelHoverEventName={click:'ProcessClick',rollOver:'ProcessRollOver',rollOut:'ProcessRollOut'},p.hasProcess)for(b=p.processes.process.process,g={elem:p.processes.process,elemIndex:E,dimension:{left:s-t+b._attrib.leftPos,right:s-t+b._attrib.rightPos,top:y-w.categorySpaceUsed,bottom:y},type:'header'},o._drawProcessAndDataTableElement(g),E+=1,u=p.gridArr=[],(a=0,c=b.length);a<c;a++)h=o.getProcessPositionByIndex(a),g={elem:b[a],elemIndex:E,pos:a,dimension:{left:s-t+b._attrib.leftPos,right:s-t+b._attrib.rightPos,top:y+h.top,bottom:y+h.bottom},type:'process'},o._drawProcessAndDataTableElement(g),E+=1,u.push({y:g.dimension.bottom});if(p.hasDataTables){for(a in d=p.dataTables.dataTable.datacolumn,d)if(d.hasOwnProperty(a)&&'_attrib'!==a)for(f in F=0,g={elem:d[a],elemIndex:E,pos:a,dimension:{left:s-t+d[a]._attrib.leftPos,right:s-t+d[a]._attrib.rightPos,top:y-w.categorySpaceUsed,bottom:y},type:'header'},o._drawProcessAndDataTableElement(g),E+=1,e=d[a].text,e){if(F>=c)break;(e[f]._attrib&&b[f]&&b[f]._attrib&&(e[f]._attrib.hoverbandcolor=b[f]._attrib.hoverbandcolor,e[f]._attrib.hoverbandalpha=b[f]._attrib.hoverbandalpha,e[f]._attrib.showhoverband=b[f]._attrib.showhoverband),e.hasOwnProperty(f)&&'_attrib'!==f)&&(h=o.getProcessPositionByIndex(f),g={elem:e[f],elemIndex:E,pos:f,dimension:{left:s-t+d[a]._attrib.leftPos,right:s-t+d[a]._attrib.rightPos,top:y+h.top,bottom:y+h.bottom},type:'datatable'},F++,o._drawProcessAndDataTableElement(g),E+=1)}p.drawFromProcessVlineDrag?p.drawFromProcessVlineDrag=!1:t>D?(k=t-D,o.resetTransletAxis(),o.translateAxis(k,void 0)):o.resetTransletAxis()}o._drawGridLine(),o._disposeExtraProcessAndDataTableElement(E)}_drawVerticalLineAndTracker(){var a,b,c,d,e,f,g,h,j,k,l=this,m=l.config,n=l.getFromEnv('chart'),o=m.canvas,p=n.config,q=m.axisDimention||{},r=q.x,s=m.totalWidth||0,t=o.canvasTop||p.canvasTop,u=l.components.processVline||(l.components.processVline=[]),v=m.processVlineArr,w=l.getContainer('hotContainer'),x=l.getFromEnv('animationManager'),y=0,z=function(){var a=this,b=a.data('drag-options');b.origX=b.lastX||(b.lastX=0),b.vHoverLine.show(),n.trackerClicked=!0,b.draged=!1},A=function(a){var b,c=this,d=c.data('drag-options'),e=d.vLineSetting,f='string'==typeof a.data?+a.data.substr(0,a.data.indexOf(',')):a.data[0]||0,g=e.xPos+f,h=e.leftLimit,i=e.rightLimit;g<h&&(f=h-e.xPos),g>i&&(f=i-e.xPos),b={transform:'t'+(d.origX+f)+','+0},c.attr(b),d.vHoverLine.attr(b),d.draged=!0,d.lastX=f},B=function(){var a,b=this,c=b.data('drag-options'),d=c.vLineSetting,e=c.vLineIndex;n.trackerClicked=!1,c.vHoverLine.hide(),c.draged&&(m.isDraged=!0,d.left.rightPos+=c.lastX||0,d.right.leftPos+=c.lastX||0,d.xPos+=c.lastX||0,v[e-1]&&(v[e-1].rightLimit+=c.lastX||0),v[e+1]&&(v[e+1].leftLimit+=c.lastX||0),m.drawFromProcessVlineDrag=!0,l._drawProcessAndDataTable(),l._drawVerticalLineAndTracker(),a={transform:'t0,0'},b.attr(a),c.vHoverLine.attr(a))};for(g={stroke:m.gridResizeBarColor,"stroke-width":m.gridResizeBarThickness},h={stroke:TRACKER_FILL,"stroke-width":30},f=t-p.categorySpaceUsed,(a=0,b=v.length);a<b;a+=1)e='process'===v[a].type?m.processes.process.process:m.dataTables.dataTable.datacolumn[v[a].ind],j=r-s+e._attrib.rightPos,c=['M',j,f,'L',j,t+m.processTotalHeight],u[y]?(k=u[y].graphics.vHoverLine,k.attr({path:c}).attr(g),d=u[y].graphics.hotElement,d.attr({path:c}).attr(h)):(g.path=c,k=x.setAnimation({el:'path',container:w,component:l,attr:g}),h.path=c,d=x.setAnimation({el:'path',container:w,component:l,attr:h}),u[y]={},u[y].graphics={},u[y].config={},u[y].graphics.vHoverLine=k,u[y].graphics.hotElement=d),d.show(),k.hide(),d.css('cursor',hasSVG&&'ew-resize'||'e-resize').drag(A,z,B).data('drag-options',{vHoverLine:u[y].graphics.vHoverLine,vLineSetting:v[a],vLineIndex:a}),y+=1;for(a=y,b=u.length;a<b;a+=1)u[a].graphics.vHoverLine.attr({path:['M',0,0]}),u[a].graphics.hotElement.attr({path:['M',0,0]})}_drawComponents(){let a=this,b=a.config;b.isDraged=!1,a._drawProcessAndDataTable(),b.drawPlotlines&&a._drawPlotLine(),a._drawVerticalLineAndTracker(),a._drawGridLine()}}export default GanttProcessAxis;